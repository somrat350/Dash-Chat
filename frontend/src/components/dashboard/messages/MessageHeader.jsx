import { MoreVertical, Phone, User, Video, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCallStore } from "../../../store/useCallStore";
import toast from "react-hot-toast";

const formatLastSeen = (lastSeenValue, currentTimeMs) => {
  if (!lastSeenValue) return "Offline";

  const lastSeenDate = new Date(lastSeenValue);
  if (Number.isNaN(lastSeenDate.getTime())) return "Offline";

  const currentTime = currentTimeMs || Date.now();
  const diffMs = currentTime - lastSeenDate.getTime();
  const diffSeconds = Math.max(0, Math.floor(diffMs / 1000));

  if (diffSeconds < 60) {
    return "Last seen just now";
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `Last seen ${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `Last seen ${diffHours} hour ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `Last seen ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }

  return `Last seen ${lastSeenDate.toLocaleDateString()}`;
};

const MessageHeader = () => {
  const { onlineUsers, authUser, typingUsers } = useAuthStore();
  const { selectedPartner, setSelectedPartner, getUserById } =
    useMessageStore();
  const { setCallIntent } = useCallStore();
  const [presenceTick, setPresenceTick] = useState(0);
  const receiverId =
    selectedPartner?._id ||
    selectedPartner?.id ||
    selectedPartner?.userId ||
    selectedPartner?.user?._id;
  const isOnline = onlineUsers?.includes(receiverId);
  const isTyping = Boolean(typingUsers?.[String(receiverId)]);
  const presenceText = useMemo(() => {
    if (isTyping) return "typing...";
    if (isOnline) return "Online";
    return formatLastSeen(selectedPartner?.lastSeen, presenceTick);
  }, [isOnline, isTyping, presenceTick, selectedPartner?.lastSeen]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPresenceTick(Date.now());
    }, 30_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Keep lastSeen fresh when the selected user is offline.
    if (!receiverId || isOnline) return;

    let cancelled = false;
    const refreshLastSeen = async () => {
      const latestUser = await getUserById(receiverId);
      if (!cancelled && latestUser?._id) {
        setSelectedPartner(latestUser);
      }
    };

    refreshLastSeen();
    return () => {
      cancelled = true;
    };
  }, [getUserById, isOnline, receiverId, setSelectedPartner]);

  const handleCall = async (type) => {
    if (!receiverId) {
      toast.error("No valid user selected for call");
      return;
    }

    setCallIntent({
      mode: "start",
      type,
      targetUser: {
        id: receiverId,
        name: selectedPartner?.name || "Unknown user",
        image: selectedPartner?.photoURL || "/default-avatar.jpg",
      },
      callId: `${[String(authUser?._id), String(receiverId)].sort().join("-")}-${Date.now()}`,
    });
  };

  return (
    <div
      className="flex justify-between items-center border-b
   border-base-content/20 pb-3 px-4 pt-4 sticky top-0 z-30 bg-base-100 h-20"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar relative`}>
          <div
            className={`text-base-content rounded-full w-12 h-12 flex items-center justify-center ${selectedPartner.photoURL || "border border-base-content"}`}
          >
            {selectedPartner.photoURL ? (
              <img src={selectedPartner.photoURL} alt={selectedPartner.name} />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${isOnline ? "bg-success" : "bg-gray-500"}`}
          ></span>
        </div>

        <div>
          <h3 className="font-medium">{selectedPartner?.name}</h3>
          <p className="text-sm text-base-content/70">{presenceText}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleCall("video")}
          className="text-primary transition-colors cursor-pointer hover:opacity-80"
          aria-label="Start video call"
          disabled={!receiverId}
        >
          <Video size={20} />
        </button>
        <button
          onClick={() => handleCall("audio")}
          className="text-primary transition-colors cursor-pointer hover:opacity-80"
          aria-label="Start audio call"
          disabled={!receiverId}
        >
          <Phone size={17} />
        </button>
        <button
          type="button"
          className="text-primary transition-colors cursor-pointer hover:opacity-80"
          aria-label="More options"
        >
          <MoreVertical size={20} />
        </button>
        <button onClick={() => setSelectedPartner(null)}>
          <X
            size={28}
            className="text-primary transition-colors cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;
