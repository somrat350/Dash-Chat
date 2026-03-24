import {
  ArrowLeft,
  Info,
  MoreVertical,
  Phone,
  ThumbsDown,
  User,
  Video,
  XCircle,
} from "lucide-react";
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
      <div className="flex items-center space-x-2 sm:space-x-3">
        <button
          onClick={() => setSelectedPartner(null)}
          className="text-primary btn btn-sm btn-circle md:hidden tooltip tooltip-bottom"
          data-tip="Back"
        >
          <ArrowLeft size={16} />
        </button>
        <div className={`avatar relative`}>
          <div
            className={`text-base-content rounded-full w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center ${selectedPartner.photoURL || "border border-base-content"}`}
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
          <h3 className="font-medium line-clamp-1 break-all">
            {selectedPartner?.name}
          </h3>
          <p className="text-sm">
            {formatChatTime(selectedPartner.lastOnline)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => handleCall("video")}
          className="text-primary btn btn-sm btn-circle tooltip tooltip-bottom"
          data-tip="Video Call"
          aria-label="Start video call"
          disabled={!receiverId}
        >
          <Video size={16} />
        </button>
        <button
          onClick={() => handleCall("audio")}
          className="text-primary btn btn-sm btn-circle tooltip tooltip-bottom"
          data-tip="Audio Call"
          aria-label="Start audio call"
          disabled={!receiverId}
        >
          <Phone size={16} />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="text-primary btn btn-sm btn-circle tooltip tooltip-bottom m-1"
            data-tip="More Options"
          >
            <MoreVertical size={16} />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button className="btn btn-sm">
                <Info size={16} /> Profile Info
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedPartner(null)}
                className="btn btn-sm"
              >
                <XCircle size={16} /> Close Chat
              </button>
            </li>
            <div className="h-px bg-base-100 my-1"></div>
            <li>
              <button className="btn btn-sm hover:bg-red-500/30 hover:text-red-500">
                <ThumbsDown size={16} /> Report
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
