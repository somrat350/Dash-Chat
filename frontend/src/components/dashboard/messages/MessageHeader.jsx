import { MoreVertical, Phone, User, Video, X } from "lucide-react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useAuthStore } from "../../../store/useAuthStore";
import { useCallStore } from "../../../store/useCallStore";
import toast from "react-hot-toast";

const MessageHeader = () => {
  const { onlineUsers, authUser } = useAuthStore();
  const { selectedPartner, setSelectedPartner } = useMessageStore();
  const { setCallIntent } = useCallStore();
  const receiverId =
    selectedPartner?._id ||
    selectedPartner?.id ||
    selectedPartner?.userId ||
    selectedPartner?.user?._id;
  const isOnline = onlineUsers?.includes(receiverId);

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

  const formatChatTime = (dateString) => {
    if (isOnline) return "Online";
    const date = new Date(dateString);
    const now = new Date();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return date
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase()
        .replace(/\s+/g, "");
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    const secondsAgo = (now - date) / 1000;
    const sevenDaysInSeconds = 7 * 24 * 60 * 60;

    if (secondsAgo < sevenDaysInSeconds) {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    }

    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
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
          <p className="text-sm">
            {formatChatTime(selectedPartner.lastOnline)}
          </p>
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
