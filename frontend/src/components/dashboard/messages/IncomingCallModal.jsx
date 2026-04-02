import { Phone, Video } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCallStore } from "../../../store/useCallStore";
import { useMessageStore } from "../../../store/useMessageStore";

const IncomingCallModal = () => {
  const navigate = useNavigate();
  const { incomingCall, clearIncomingCall, socket } = useAuthStore();
  const { setCallIntent, updateCallStatus } = useCallStore();
  const { setSelectedPartner } = useMessageStore();
  const ringtoneRef = useRef(null);

  const getIncomingRingtone = (type) => {
    if (type === "video") return "/sounds/calling.mp3";
    return "/sounds/ringtone.mp3";
  };

  useEffect(() => {
    if (!incomingCall) {
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
      return;
    }

    const audio = new Audio(getIncomingRingtone(incomingCall?.type));
    audio.loop = true;
    audio.volume = 0.7;
    ringtoneRef.current = audio;

    audio.play().catch(() => {
      // Autoplay can be blocked by browser policy until user gesture.
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
      if (ringtoneRef.current === audio) {
        ringtoneRef.current = null;
      }
    };
  }, [incomingCall]);

  if (!incomingCall) return null;

  const callerName = incomingCall?.caller?.name || "Unknown user";
  const callerImage = incomingCall?.caller?.photoURL || "/default-avatar.jpg";
  const isVideo = incomingCall?.type === "video";

  const handleAccept = async () => {
    if (!incomingCall?.callId || !incomingCall?.caller?._id) {
      clearIncomingCall();
      return;
    }

    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    if (socket?.connected && incomingCall?.caller?._id) {
      socket.emit("acceptIncomingCall", {
        toUserId: String(incomingCall.caller._id),
        callId: incomingCall.callId || null,
      });
    }

    setSelectedPartner({
      _id: incomingCall.caller._id,
      name: callerName,
      photoURL: callerImage,
      email: incomingCall?.caller?.email || "",
    });

    setCallIntent({
      mode: "join",
      callId: incomingCall.callId,
      recordId: incomingCall.recordId,
      type: incomingCall.type,
      targetUser: {
        id: incomingCall.caller._id,
        name: callerName,
        image: callerImage,
      },
    });

    navigate("/dashboard");

    clearIncomingCall();
  };

  const handleDecline = async () => {
    const endedAt = new Date().toISOString();

    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    if (incomingCall?.recordId) {
      await updateCallStatus(incomingCall.recordId, {
        status: "rejected",
        endedAt,
        endReason: "rejected",
      });
    }

    if (socket?.connected && incomingCall?.caller?._id) {
      socket.emit("rejectIncomingCall", {
        toUserId: String(incomingCall.caller._id),
        callId: incomingCall.callId || null,
      });
    }

    clearIncomingCall();
  };

  return (
    <div className="fixed inset-0 z-10000 bg-black/45 backdrop-blur-xs flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl bg-base-100 p-6 shadow-2xl border border-base-300">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="avatar">
            <div className="w-20 rounded-full ring-2 ring-primary/50">
              <img src={callerImage} alt={callerName} />
            </div>
          </div>

          <p className="text-sm text-base-content/70">Incoming call</p>
          <h3 className="text-lg font-semibold line-clamp-1">{callerName}</h3>

          <div className="badge badge-outline mt-1">
            {isVideo ? "Video call" : "Audio call"}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handleDecline}
            className="btn btn-error btn-circle"
            aria-label="Decline call"
          >
            <Phone size={18} className="rotate-135" />
          </button>

          <button
            onClick={handleAccept}
            className="btn btn-success btn-circle"
            aria-label="Accept call"
          >
            {isVideo ? <Video size={18} /> : <Phone size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
