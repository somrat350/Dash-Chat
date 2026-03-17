import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  LucidePhone,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Video,
  Clock,
  CalendarClock,
  Search,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import ComponentsLoader from "../../components/ComponentsLoader";
import toast from "react-hot-toast";
import {
  CallingState,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useCallStore } from "../../store/useCallStore";
import { useLocation, useNavigate } from "react-router";

const tabs = [
  { key: "all", label: "All Calls" },
  { key: "missed", label: "Missed" },
  { key: "incoming", label: "Incoming" },
  { key: "outgoing", label: "Outgoing" },
  { key: "scheduled", label: "Scheduled" },
];

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

const ActiveCallPanel = ({
  onLeave,
  callType,
  targetUser,
  callDirection,
  isCallAccepted,
}) => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const callingAudioRef = useRef(null);
  const connectedAtRef = useRef(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      onLeave();
    }
  }, [callingState, onLeave]);

  useEffect(() => {
    const shouldRingback =
      callDirection === "outgoing" &&
      participants.length <= 1 &&
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

    callingAudioRef.current.play().catch(() => {
      // Browser autoplay policy can block playback before user interaction.
    });

    return () => {
      if (callingAudioRef.current) {
        callingAudioRef.current.pause();
        callingAudioRef.current.currentTime = 0;
      }
    };
  }, [callDirection, callingState, participants.length]);

  useEffect(() => {
    const shouldRunTimer = isCallAccepted && callingState !== CallingState.LEFT;

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
  }, [callingState, isCallAccepted]);

  const isAudio = callType === "audio";
  const callDurationLabel = formatLiveDuration(elapsedSeconds);
  const hasStarted = isCallAccepted;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col bg-base-100">
      {/* Header */}
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

      {/* Call content */}
      <div className="flex-1 overflow-hidden">
        {isAudio ? (
          <div className="h-full flex flex-col items-center justify-center gap-8 bg-base-200">
            <div className="flex flex-wrap justify-center gap-10">
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

      {/* Controls */}
      <div className="flex justify-center py-5 bg-base-200 border-t border-base-300">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};

const Calls = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, socket, callSignal, clearCallSignal } = useAuthStore();
  const {
    initiateCall,
    setCurrentCall,
    clearCurrentCall,
    updateCallStatus,
    isCallLoading,
  } = useCallStore();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [streamClient, setStreamClient] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [activeCallType, setActiveCallType] = useState("audio");
  const [activeCallDirection, setActiveCallDirection] = useState("outgoing");
  const [activeTargetUser, setActiveTargetUser] = useState(null);
  const [isOutgoingAccepted, setIsOutgoingAccepted] = useState(false);
  const [isClientLoading, setIsClientLoading] = useState(true);
  const [pendingOutgoingCallId, setPendingOutgoingCallId] = useState(null);
  const [activeCallRecordId, setActiveCallRecordId] = useState(null);
  const acceptedAtRef = useRef(null);

  const { data: rawCalls = [], isLoading } = useQuery({
    queryKey: ["calls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/calls");
      return res.data;
    },
  });

  useEffect(() => {
    let mounted = true;

    const initClient = async () => {
      if (!authUser?._id) {
        setIsClientLoading(false);
        return;
      }

      try {
        setIsClientLoading(true);
        const res = await axiosSecure.get("/api/calls/token");
        const { apiKey, token, user } = res.data;

        if (!apiKey || !token || !user?.id) {
          throw new Error("Invalid Stream token payload");
        }

        const client = new StreamVideoClient({
          apiKey,
          user,
          token,
        });

        if (mounted) {
          setStreamClient(client);
        } else {
          await client.disconnectUser();
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Call service unavailable",
        );
      } finally {
        if (mounted) {
          setIsClientLoading(false);
        }
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

  // Transform API data to determine incoming/outgoing relative to logged-in user
  const callsData = useMemo(
    () =>
      rawCalls
        .map((call) => {
          const caller = call?.caller;
          const receiver = call?.receiver;

          if (!caller && !receiver) return null;

          const isIncoming = receiver?._id === authUser?._id;
          const otherUser =
            (isIncoming ? caller : receiver) || caller || receiver;

          if (!otherUser) return null;

          const isMissedForViewer =
            call.status === "missed" && receiver?._id === authUser?._id;

          const callType =
            call.status === "scheduled"
              ? "scheduled"
              : isMissedForViewer
                ? "missed"
                : isIncoming
                  ? "incoming"
                  : "outgoing";

          return {
            id: call._id,
            name: otherUser.name || "Unknown user",
            avatar: otherUser.photoURL || "/default-avatar.jpg",
            type: callType,
            medium: call.type, // "audio" or "video"
            createdAtMs: new Date(call.scheduledAt || call.createdAt).getTime(),
            time: new Date(call.scheduledAt || call.createdAt).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              },
            ),
            duration: call.duration
              ? `${Math.floor(call.duration / 60)}:${String(call.duration % 60).padStart(2, "0")}`
              : null,
            durationSeconds: Number(call.duration) || 0,
            status: call.status,
            endReason: call.endReason || null,
            isMissedForViewer,
            otherUserId: otherUser._id || null,
          };
        })
        .filter(Boolean),
    [rawCalls, authUser?._id],
  );

  const handleLeave = useCallback(
    async (options = {}) => {
      const shouldEmitEndSignal = options.shouldEmitEndSignal !== false;
      const shouldPersistStatus = options.shouldPersistStatus !== false;
      const callToLeave = activeCall;
      const targetUserId = activeTargetUser?.id || null;
      const callDirection = activeCallDirection;
      const callId = activeCall?.id || pendingOutgoingCallId || null;
      const callRecordId = activeCallRecordId;
      const wasAccepted =
        callDirection === "incoming" ||
        isOutgoingAccepted ||
        Boolean(acceptedAtRef.current);
      const endReason =
        options.endReason || (wasAccepted ? "completed" : "cancelled");
      const status = END_REASON_TO_STATUS[endReason] || "completed";
      const endedAt = new Date().toISOString();
      const durationSeconds = getElapsedDurationSeconds(acceptedAtRef.current);
      const startedAt = getStartedAtIso(acceptedAtRef.current);

      setActiveCall(null);
      setActiveTargetUser(null);
      setActiveCallDirection("outgoing");
      setIsOutgoingAccepted(false);
      setPendingOutgoingCallId(null);
      setActiveCallRecordId(null);
      clearCurrentCall();

      try {
        if (shouldEmitEndSignal && socket?.connected && targetUserId) {
          socket.emit("endCallSession", {
            toUserId: String(targetUserId),
            callId,
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
      } catch (error) {
        console.error("Failed to leave call:", error);
      } finally {
        acceptedAtRef.current = null;
      }
    },
    [
      activeCall,
      activeCallDirection,
      activeCallRecordId,
      activeTargetUser,
      clearCurrentCall,
      isOutgoingAccepted,
      pendingOutgoingCallId,
      socket,
      updateCallStatus,
    ],
  );

  const startCall = useCallback(
    async (targetUser, type, options = {}) => {
      const receiverId = targetUser?.id;
      if (!streamClient || !authUser?._id || !receiverId) {
        toast.error("Call service is not ready yet");
        return;
      }

      const shouldCreateRecord = options.shouldCreateRecord !== false;

      // Max 64 chars: 24 + 1 + 24 + 1 + 13 = 63
      const callId =
        options.callId ||
        `${[String(authUser._id), String(receiverId)].sort().join("-")}-${Date.now()}`;

      try {
        if ((options.direction || "outgoing") === "outgoing") {
          setPendingOutgoingCallId(callId);
        }

        // Register both users in Stream before creating the call
        await axiosSecure.post("/api/calls/ensure-members", { receiverId });

        const call = streamClient.call("default", callId);

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

        // Configure media based on call type
        if (type === "audio") {
          await call.camera.disable();
          await call.microphone.enable();
        } else {
          await call.camera.enable();
          await call.microphone.enable();
        }

        setActiveCallType(type);
        setActiveCallDirection(options.direction || "outgoing");
        setActiveTargetUser(targetUser);
        setIsOutgoingAccepted((options.direction || "outgoing") === "incoming");
        acceptedAtRef.current =
          (options.direction || "outgoing") === "incoming" ? Date.now() : null;
        setActiveCall(call);
        setCurrentCall(call.id);
        setPendingOutgoingCallId(null);

        if (shouldCreateRecord) {
          const createdCall = await initiateCall(receiverId, type, {
            streamCallId: callId,
          });
          setActiveCallRecordId(createdCall?._id || null);
        } else {
          setActiveCallRecordId(options.recordId || null);
        }
      } catch (error) {
        console.error("Failed to start call:", error);
        toast.error(error?.message || "Unable to start call");
      }
    },
    [authUser?._id, initiateCall, setCurrentCall, streamClient],
  );

  useEffect(() => {
    const request = location.state?.startCall || location.state?.joinCall;
    if (!request || !streamClient || isClientLoading || activeCall) return;

    const receiverId = request.receiverId || request.callerId;
    const type = request.type === "video" ? "video" : "audio";
    const isJoinRequest = Boolean(location.state?.joinCall);

    if (!receiverId) {
      navigate(location.pathname, { replace: true, state: null });
      return;
    }

    startCall(
      {
        id: receiverId,
        name: request.name || request.callerName || "Unknown user",
        image: request.image || request.callerImage || "/default-avatar.jpg",
      },
      type,
      {
        callId: request.callId,
        recordId: request.recordId,
        shouldCreateRecord: !isJoinRequest,
        direction: isJoinRequest ? "incoming" : "outgoing",
      },
    );

    // Clear one-time navigation state to prevent repeated auto-calls on refresh.
    navigate(location.pathname, { replace: true, state: null });
  }, [
    activeCall,
    isClientLoading,
    location.pathname,
    location.state,
    navigate,
    startCall,
    streamClient,
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
      acceptedAtRef.current = callSignal.acceptedAt || Date.now();
      setIsOutgoingAccepted(true);
      if (activeCallRecordId) {
        updateCallStatus(activeCallRecordId, {
          status: "received",
          startedAt: getStartedAtIso(acceptedAtRef.current),
        });
      }
      clearCallSignal();
      return;
    }

    if (callSignal.type !== "callEnded") return;

    const endToast = getCallEndToast(callSignal.reason);
    if (endToast) {
      toast.error(endToast);
    }

    handleLeave({
      endReason: callSignal.reason,
      shouldEmitEndSignal: false,
      shouldPersistStatus: false,
    });
    clearCallSignal();
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
      isOutgoingAccepted
    ) {
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const callRecordId = activeCallRecordId;
      const endedAt = new Date().toISOString();

      toast.error("Call timed out");

      if (callRecordId) {
        await updateCallStatus(callRecordId, {
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
    isOutgoingAccepted,
    updateCallStatus,
  ]);

  if (isLoading || isClientLoading) return <ComponentsLoader />;

  const filtered = (() => {
    const base = callsData.filter((call) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "missed" && call.isMissedForViewer) ||
        (activeTab === "scheduled" && call.type === "scheduled") ||
        (activeTab !== "missed" &&
          activeTab !== "scheduled" &&
          call.type === activeTab);
      const matchesSearch = call.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });

    const sorted = [...base];
    if (sortBy === "oldest") {
      sorted.sort((a, b) => a.createdAtMs - b.createdAtMs);
    } else if (sortBy === "longest") {
      sorted.sort((a, b) => {
        if (b.durationSeconds !== a.durationSeconds) {
          return b.durationSeconds - a.durationSeconds;
        }
        return b.createdAtMs - a.createdAtMs;
      });
    } else {
      sorted.sort((a, b) => b.createdAtMs - a.createdAtMs);
    }

    return sorted;
  })();

  const getCallIcon = (call) => {
    if (call.isMissedForViewer)
      return <PhoneMissed size={18} className="text-error" />;
    if (call.type === "incoming")
      return <PhoneIncoming size={18} className="text-success" />;
    if (call.type === "outgoing")
      return <PhoneOutgoing size={18} className="text-info" />;
    if (call.type === "scheduled")
      return <CalendarClock size={18} className="text-warning" />;
    return <Phone size={18} />;
  };

  const getStatusBadge = (call) => {
    if (call.isMissedForViewer)
      return <span className="badge badge-error badge-sm">Missed</span>;
    if (call.type === "scheduled")
      return <span className="badge badge-warning badge-sm">Scheduled</span>;
    if (call.status === "rejected")
      return <span className="badge badge-secondary badge-sm">Declined</span>;
    if (call.status === "cancelled")
      return <span className="badge badge-neutral badge-sm">Cancelled</span>;
    if (call.status === "failed")
      return <span className="badge badge-error badge-sm">Disconnected</span>;
    if (call.status === "completed")
      return <span className="badge badge-success badge-sm">Completed</span>;
    return null;
  };

  const getReasonLine = (call) => {
    if (call.isMissedForViewer || call.status === "missed") {
      return "No answer";
    }
    if (call.status === "rejected") {
      return "Declined by receiver";
    }
    if (call.status === "cancelled") {
      return "Cancelled before pickup";
    }
    if (call.status === "failed") {
      return "Connection lost";
    }
    return null;
  };

  return (
    <div>
      {/* Full-screen call overlay */}
      {streamClient && activeCall && (
        <StreamVideo client={streamClient}>
          <StreamCall call={activeCall}>
            <StreamTheme>
              <ActiveCallPanel
                onLeave={handleLeave}
                callType={activeCallType}
                callDirection={activeCallDirection}
                targetUser={activeTargetUser}
                isCallAccepted={
                  activeCallDirection === "incoming" || isOutgoingAccepted
                }
              />
            </StreamTheme>
          </StreamCall>
        </StreamVideo>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-primary">
            <Phone size={24} />
          </div>
          <div className="stat-title text-xs">Total Calls</div>
          <div className="stat-value text-2xl text-base-content">
            {callsData.length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-success">
            <PhoneIncoming size={24} />
          </div>
          <div className="stat-title text-xs">Incoming</div>
          <div className="stat-value text-2xl text-base-content">
            {callsData.filter((c) => c.type === "incoming").length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-error">
            <PhoneMissed size={24} />
          </div>
          <div className="stat-title text-xs">Missed</div>
          <div className="stat-value text-2xl text-base-content">
            {callsData.filter((c) => c.isMissedForViewer).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-warning">
            <CalendarClock size={24} />
          </div>
          <div className="stat-title text-xs">Scheduled</div>
          <div className="stat-value text-2xl text-base-content">
            {callsData.filter((c) => c.type === "scheduled").length}
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex gap-1 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`btn btn-sm ${
                activeTab === tab.key ? "btn-primary" : "btn-ghost"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <label className="input input-bordered input-sm flex items-center gap-2 flex-1 sm:w-64">
            <Search size={16} className="opacity-50" />
            <input
              type="text"
              placeholder="Search calls..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="grow"
            />
          </label>
          <select
            className="select select-bordered select-sm w-36"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort calls"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="longest">Longest</option>
          </select>
        </div>
      </div>

      {/* Call List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-xl">
          <PhoneMissed size={48} className="mx-auto opacity-30 mb-3" />
          <p className="text-lg font-medium text-base-content/70">
            No calls found
          </p>
          <p className="text-sm text-base-content/50">
            {callsData.length === 0
              ? "You haven't made any calls yet. Use the call buttons in chat to make your first call!"
              : "Try adjusting your filter or search"}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((call) => (
            <div
              key={call.id}
              className="card bg-base-200 hover:bg-base-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="card-body p-4 gap-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1">
                      <img src={call.avatar} alt={call.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate text-base-content">
                      {call.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-base-content/60">
                      {getCallIcon(call)}
                      <span className="capitalize">{call.type}</span>
                      {call.medium === "video" && (
                        <Video size={14} className="ml-1" />
                      )}
                    </div>
                  </div>
                  {getStatusBadge(call)}
                </div>

                {/* Time & Duration */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-base-content/60">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {call.time}
                  </span>
                  {call.duration && (
                    <span
                      className={`badge badge-sm gap-1 px-2 py-2 font-mono ${
                        call.status === "completed"
                          ? "badge-success text-success-content"
                          : "badge-outline text-base-content/70"
                      }`}
                    >
                      <LucidePhone size={12} />
                      {call.duration}
                    </span>
                  )}
                </div>

                {call.duration && (
                  <p className="text-xs text-base-content/50 -mt-1">
                    Talked for {call.duration}
                  </p>
                )}

                {getReasonLine(call) && (
                  <p className="text-xs text-base-content/50 -mt-1">
                    {getReasonLine(call)}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() =>
                      startCall(
                        {
                          id: call.otherUserId,
                          name: call.name,
                          image: call.avatar,
                        },
                        "audio",
                      )
                    }
                    className="btn btn-primary btn-sm flex-1 gap-1"
                    disabled={isCallLoading || !call.otherUserId}
                  >
                    <Phone size={15} />
                    Call
                  </button>
                  <button
                    onClick={() =>
                      startCall(
                        {
                          id: call.otherUserId,
                          name: call.name,
                          image: call.avatar,
                        },
                        "video",
                      )
                    }
                    className="btn btn-secondary btn-sm flex-1 gap-1"
                    disabled={isCallLoading || !call.otherUserId}
                  >
                    <Video size={15} />
                    Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calls;
