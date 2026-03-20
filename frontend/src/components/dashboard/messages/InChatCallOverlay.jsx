import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Phone, Video } from "lucide-react";
import toast from "react-hot-toast";
import {
  CallingState,
  CallControls,
  ParticipantsAudio,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { axiosSecure } from "../../../lib/axios";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCallStore } from "../../../store/useCallStore";
import { useMessageStore } from "../../../store/useMessageStore";

const buildCallSummary = ({ type, status }) => {
  const medium = type === "video" ? "Video" : "Audio";
  if (status === "missed") return `${medium} call missed`;
  if (status === "rejected") return `${medium} call declined`;
  if (status === "cancelled") return `${medium} call cancelled`;
  if (status === "connection-lost") return `${medium} call disconnected`;
  return `${medium} call ended`;
};

const CALL_TIMEOUT_MS = 30_000;

const END_REASON_TO_STATUS = {
  missed: "missed",
  rejected: "rejected",
  completed: "completed",
  cancelled: "cancelled",
  "connection-lost": "failed",
};

const getStartedAtIso = (timestamp) =>
  timestamp ? new Date(timestamp).toISOString() : null;

const getElapsedDurationSeconds = (startedAtTimestamp) => {
  if (!startedAtTimestamp) return 0;

  return Math.max(0, Math.floor((Date.now() - startedAtTimestamp) / 1000));
};

const getCallEndToast = (reason) => {
  switch (reason) {
    case "missed":
      return "Call timed out";
    case "rejected":
      return "Call was declined by receiver";
    case "cancelled":
      return "Call was cancelled";
    case "connection-lost":
      return "Call ended due to connection loss";
    default:
      return null;
  }
};

const formatLiveDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, seconds]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  }

  return [minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
};

const ActiveChatCallPanel = ({
  callType,
  targetUser,
  callDirection,
  isOutgoingAccepted,
  isEndingCall,
  onLeave,
  onConnected,
}) => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const callingAudioRef = useRef(null);
  const hasConnectedRef = useRef(false);
  const connectedAtRef = useRef(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      onLeave();
    }
  }, [callingState, onLeave]);

  useEffect(() => {
    if (participants.length > 1 && !hasConnectedRef.current) {
      hasConnectedRef.current = true;
      onConnected();
    }
  }, [onConnected, participants.length]);

  useEffect(() => {
    const shouldRingback =
      callDirection === "outgoing" &&
      !isOutgoingAccepted &&
      !isEndingCall &&
      callingState !== CallingState.LEFT;

    if (!shouldRingback) {
      if (callingAudioRef.current) {
        callingAudioRef.current.pause();
        callingAudioRef.current.currentTime = 0;
      }
      return;
    }

    if (!callingAudioRef.current) {
      const audio = new Audio("/sounds/calling.mp3");
      audio.loop = true;
      audio.volume = 0.7;
      callingAudioRef.current = audio;
    }

    callingAudioRef.current.play().catch(() => {});

    return () => {
      if (callingAudioRef.current) {
        callingAudioRef.current.pause();
        callingAudioRef.current.currentTime = 0;
      }
    };
  }, [callDirection, callingState, isEndingCall, isOutgoingAccepted]);

  useEffect(() => {
    const shouldRunTimer =
      (callDirection === "incoming" || isOutgoingAccepted) &&
      callingState !== CallingState.LEFT;

    if (!shouldRunTimer) {
      connectedAtRef.current = null;
      setElapsedSeconds(0);
      return;
    }

    if (!connectedAtRef.current) {
      connectedAtRef.current = Date.now();
      setElapsedSeconds(0);
    }

    const intervalId = window.setInterval(() => {
      const nextElapsedSeconds = Math.floor(
        (Date.now() - connectedAtRef.current) / 1000,
      );
      setElapsedSeconds(nextElapsedSeconds);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [callDirection, callingState, isOutgoingAccepted]);

  const isAudio = callType === "audio";
  const remoteParticipants = participants.filter(
    (participant) => !participant.isLocalParticipant,
  );
  const callDurationLabel = formatLiveDuration(elapsedSeconds);
  const hasStarted = callDirection === "incoming" || isOutgoingAccepted;

  return (
    <div className="absolute inset-0 z-[80] flex flex-col bg-base-100">
      <ParticipantsAudio participants={remoteParticipants} />
      <div className="flex items-center justify-between px-6 py-4 bg-base-200 border-b border-base-300">
        <div className="flex items-center gap-2">
          {isAudio ? (
            <Phone size={16} className="text-primary" />
          ) : (
            <Video size={16} className="text-primary" />
          )}
          <span className="text-base-content font-semibold text-sm">
            {isAudio ? "Audio Call" : "Video Call"}
          </span>
          {targetUser?.name && (
            <span className="text-base-content/60 text-sm">
              with {targetUser.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-base-content/50">
          {hasStarted && (
            <span className="font-mono text-sm text-base-content/70">
              {callDurationLabel}
            </span>
          )}
          <span>
            {participants.length} participant
            {participants.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {isAudio ? (
          <div className="h-full flex flex-col items-center justify-center gap-8 bg-base-200">
            <div className="flex flex-col items-center gap-3">
              <div className="avatar">
                <div className="w-28 h-28 rounded-full ring-4 ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
                  <img
                    src={targetUser?.image || "/default-avatar.jpg"}
                    alt={targetUser?.name || "Participant"}
                  />
                </div>
              </div>
              <span className="text-base-content text-lg font-semibold">
                {targetUser?.name || "Connecting..."}
              </span>
            </div>
            <p className="text-base-content/60 text-sm animate-pulse">
              {hasStarted ? `Call duration ${callDurationLabel}` : "Ringing..."}
            </p>
          </div>
        ) : (
          <div className="h-full">
            <SpeakerLayout participantsBarPosition="bottom" />
          </div>
        )}
      </div>

      <div className="flex justify-center py-5 bg-base-200 border-t border-base-300">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};

const InChatCallOverlay = () => {
  const { authUser, socket, callSignal, clearCallSignal } = useAuthStore();
  const { selectedPartner, sendMessage } = useMessageStore();
  const {
    callIntent,
    clearCallIntent,
    initiateCall,
    updateCallStatus,
    setCurrentCall,
    clearCurrentCall,
  } = useCallStore();
  const [streamClient, setStreamClient] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [activeTargetUser, setActiveTargetUser] = useState(null);
  const [activeCallType, setActiveCallType] = useState("audio");
  const [activeCallDirection, setActiveCallDirection] = useState("outgoing");
  const [isOutgoingAccepted, setIsOutgoingAccepted] = useState(false);
  const [isEndingCall, setIsEndingCall] = useState(false);
  const [activeCallRecordId, setActiveCallRecordId] = useState(null);
  const [pendingOutgoingCallId, setPendingOutgoingCallId] = useState(null);
  const connectedAtRef = useRef(null);
  const hasLoggedCallRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const initClient = async () => {
      if (!authUser?._id) return;

      try {
        const res = await axiosSecure.get("/api/calls/token");
        const { apiKey, token, user } = res.data;
        const client = new StreamVideoClient({ apiKey, user, token });

        if (mounted) {
          setStreamClient(client);
        } else {
          await client.disconnectUser();
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Call service unavailable",
        );
      }
    };

    initClient();

    return () => {
      mounted = false;
    };
  }, [authUser?._id]);

  useEffect(() => {
    return () => {
      if (streamClient) {
        streamClient.disconnectUser();
      }
    };
  }, [streamClient]);

  const currentChatUserId = useMemo(
    () => selectedPartner?._id || selectedPartner?.id || null,
    [selectedPartner],
  );

  const logCallMessage = useCallback(
    async (status, options = {}) => {
      const targetUserId = options.targetUserId ?? activeTargetUser?.id;
      const callDirection = options.callDirection ?? activeCallDirection;
      const callType = options.callType ?? activeCallType;
      const durationSeconds = options.durationSeconds ?? 0;
      const startedAt = options.startedAt ?? null;
      const endedAt = options.endedAt ?? new Date().toISOString();

      if (
        !targetUserId ||
        hasLoggedCallRef.current ||
        callDirection !== "outgoing"
      ) {
        return;
      }

      hasLoggedCallRef.current = true;
      await sendMessage({
        text: buildCallSummary({ type: callType, status }),
        messageType: "call",
        callData: {
          callType,
          status,
          duration: durationSeconds,
          startedAt,
          endedAt,
        },
      });
    },
    [activeCallDirection, activeCallType, activeTargetUser?.id, sendMessage],
  );

  const handleLeave = useCallback(
    async (options = {}) => {
      const shouldEmitEndSignal = options.shouldEmitEndSignal !== false;
      const shouldPersistStatus = options.shouldPersistStatus !== false;
      const callToLeave = activeCall;
      const targetUserId = activeTargetUser?.id || null;
      const callDirection = activeCallDirection;
      const callType = activeCallType;
      const callRecordId = activeCallRecordId;
      const outgoingCallId = pendingOutgoingCallId;
      const wasAccepted =
        callDirection === "incoming" ||
        isOutgoingAccepted ||
        Boolean(connectedAtRef.current);
      const endReason =
        options.endReason || (wasAccepted ? "completed" : "cancelled");
      const status = END_REASON_TO_STATUS[endReason] || "completed";
      const endedAt = new Date().toISOString();
      const durationSeconds = getElapsedDurationSeconds(connectedAtRef.current);
      const startedAt = getStartedAtIso(connectedAtRef.current);

      setIsEndingCall(true);
      setActiveCall(null);
      setActiveTargetUser(null);
      setActiveCallDirection("outgoing");
      setIsOutgoingAccepted(false);
      setActiveCallRecordId(null);
      setPendingOutgoingCallId(null);
      clearCurrentCall();

      try {
        if (shouldEmitEndSignal && socket?.connected && targetUserId) {
          socket.emit("endCallSession", {
            toUserId: String(targetUserId),
            callId: callToLeave?.id || outgoingCallId || null,
            reason: endReason,
            duration: durationSeconds,
          });
        }

        if (callToLeave) {
          await Promise.allSettled([
            callToLeave.microphone?.disable?.(),
            callToLeave.camera?.disable?.(),
          ]);
          await callToLeave.leave();
        }

        if (shouldPersistStatus && callRecordId) {
          await updateCallStatus(callRecordId, {
            status,
            duration: durationSeconds,
            startedAt,
            endedAt,
            endReason,
          });
        }

        await logCallMessage(endReason, {
          targetUserId,
          callDirection,
          callType,
          durationSeconds,
          startedAt,
          endedAt,
        });
      } catch (error) {
        console.error("Failed to leave chat call:", error);
      } finally {
        setIsEndingCall(false);
        connectedAtRef.current = null;
        hasLoggedCallRef.current = false;
      }
    },
    [
      activeCall,
      activeCallDirection,
      activeCallRecordId,
      activeCallType,
      activeTargetUser?.id,
      clearCurrentCall,
      isOutgoingAccepted,
      logCallMessage,
      pendingOutgoingCallId,
      socket,
      updateCallStatus,
    ],
  );

  useEffect(() => {
    if (!streamClient || !callIntent || !currentChatUserId) return;
    if (activeCall) return;

    const targetUserId = callIntent.targetUser?.id;
    if (!targetUserId || targetUserId !== currentChatUserId) return;

    const startOrJoin = async () => {
      const { mode, type, targetUser, callId, recordId } = callIntent;
      const receiverId = targetUser.id;

      try {
        if (mode === "start") {
          setPendingOutgoingCallId(callId);
        }

        await axiosSecure.post("/api/calls/ensure-members", { receiverId });

        const streamCallId =
          callId ||
          `${[String(authUser._id), String(receiverId)].sort().join("-")}-${Date.now()}`;

        if (mode === "start") {
          const createdCall = await initiateCall(receiverId, type, {
            streamCallId,
          });
          setActiveCallRecordId(createdCall?._id || null);
        } else {
          setActiveCallRecordId(recordId || null);
          if (recordId) {
            const startedAt = new Date().toISOString();
            await updateCallStatus(recordId, {
              status: "received",
              startedAt,
            });
            connectedAtRef.current = new Date(startedAt).getTime();
          }
        }

        const call = streamClient.call("default", streamCallId);
        await call.getOrCreate({
          data: {
            members: [
              { user_id: String(authUser._id) },
              { user_id: String(receiverId) },
            ],
            custom: { medium: type },
          },
        });

        await call.join({ create: true });

        if (type === "audio") {
          await call.camera.disable();
          await call.microphone.enable();
        } else {
          await call.camera.enable();
          await call.microphone.enable();
        }

        setActiveCall(call);
        setActiveTargetUser(targetUser);
        setActiveCallType(type);
        setActiveCallDirection(mode === "join" ? "incoming" : "outgoing");
        setIsOutgoingAccepted(mode === "join");
        setCurrentCall(call.id);
        setPendingOutgoingCallId(null);
        hasLoggedCallRef.current = false;
        connectedAtRef.current = mode === "join" ? Date.now() : null;
      } catch (error) {
        toast.error(error?.message || "Unable to start call");
      } finally {
        clearCallIntent();
      }
    };

    startOrJoin();
  }, [
    activeCall,
    authUser?._id,
    callIntent,
    clearCallIntent,
    currentChatUserId,
    initiateCall,
    setCurrentCall,
    streamClient,
    updateCallStatus,
  ]);

  useEffect(() => {
    if (!callSignal) return;

    const currentCallId = activeCall?.id || pendingOutgoingCallId;
    if (
      callSignal.callId &&
      currentCallId &&
      callSignal.callId !== currentCallId
    ) {
      clearCallSignal();
      return;
    }

    if (callSignal.type === "callAccepted") {
      connectedAtRef.current = callSignal.acceptedAt || Date.now();
      setIsOutgoingAccepted(true);
      if (activeCallRecordId) {
        updateCallStatus(activeCallRecordId, {
          status: "received",
          startedAt: getStartedAtIso(connectedAtRef.current),
        });
      }
      clearCallSignal();
      return;
    }

    if (callSignal.type !== "callEnded") {
      clearCallSignal();
      return;
    }

    const stopRemoteEndedCall = async () => {
      const endToast = getCallEndToast(callSignal.reason);
      if (endToast) {
        toast.error(endToast);
      }

      await handleLeave({
        endReason: callSignal.reason,
        shouldEmitEndSignal: false,
        shouldPersistStatus: false,
      });
      clearCallSignal();
    };

    stopRemoteEndedCall();
  }, [
    activeCall?.id,
    activeCallRecordId,
    callSignal,
    clearCallSignal,
    handleLeave,
    pendingOutgoingCallId,
    updateCallStatus,
  ]);

  useEffect(() => {
    if (
      !activeCall ||
      activeCallDirection !== "outgoing" ||
      isOutgoingAccepted ||
      isEndingCall
    ) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const endedAt = new Date().toISOString();

      toast.error("Call timed out");

      if (activeCallRecordId) {
        await updateCallStatus(activeCallRecordId, {
          status: "missed",
          endedAt,
          endReason: "missed",
        });
      }

      await handleLeave({
        endReason: "missed",
        shouldEmitEndSignal: true,
        shouldPersistStatus: false,
      });
    }, CALL_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    activeCall,
    activeCallDirection,
    activeCallRecordId,
    handleLeave,
    isEndingCall,
    isOutgoingAccepted,
    updateCallStatus,
  ]);

  if (!streamClient || !activeCall) return null;

  return (
    <StreamVideo client={streamClient}>
      <StreamCall call={activeCall}>
        <StreamTheme>
          <ActiveChatCallPanel
            callType={activeCallType}
            targetUser={activeTargetUser}
            callDirection={activeCallDirection}
            isOutgoingAccepted={isOutgoingAccepted}
            isEndingCall={isEndingCall}
            onConnected={() => {}}
            onLeave={handleLeave}
          />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default InChatCallOverlay;
