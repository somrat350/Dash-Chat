import {
  ArrowLeft,
  Ban,
  Circle,
  Eraser,
  Flag,
  Heart,
  HeartPlus,
  Info,
  Mail,
  MoreVertical,
  Phone,
  Search,
  Trash2,
  User,
  Video,
  X,
  XCircle,
} from "lucide-react";
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

const MessageHeader = ({
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const { onlineUsers, authUser, typingUsers } = useAuthStore();
  const {
    selectedPartner,
    setSelectedPartner,
    getUserById,
    clearChatForMe,
    deleteChatConversation,
    messages,
  } = useMessageStore();
  const { setCallIntent } = useCallStore();
  const [presenceTick, setPresenceTick] = useState(0);
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const receiverId =
    selectedPartner?._id ||
    selectedPartner?.id ||
    selectedPartner?.userId ||
    selectedPartner?.user?._id;
  const isOnline = onlineUsers?.includes(receiverId);
  const isTyping = Boolean(typingUsers?.[String(receiverId)]);
  const partnerName = selectedPartner?.name || "User";
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

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery("");
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleOpenProfileInfo = () => {
    if (!selectedPartner) {
      toast.error("No user selected");
      return;
    }

    setIsProfileInfoOpen(true);
  };

  const handleAddToFavorites = () => {
    toast.success(`${partnerName} added to favorites`);
  };

  const handleAddToList = () => {
    toast.success(`${partnerName} added to your list`);
  };

  const handleClearChat = () => {
    if (!messages.length) {
      toast("No messages to clear");
      return;
    }
    setConfirmAction("clear");
  };

  const handleBlockUser = () => {
    toast.error(`${partnerName} blocked`);
  };

  const handleReportUser = () => {
    toast.success(`Report submitted for ${partnerName}`);
  };

  const handleDeleteChat = () => {
    if (!messages.length) {
      toast("No messages to delete");
      return;
    }
    setConfirmAction("delete");
  };

  const confirmActionTitle =
    confirmAction === "clear" ? "Clear this chat?" : "Delete this chat?";
  const confirmActionMessage =
    confirmAction === "clear"
      ? "This will clear this conversation for you."
      : "Your sent messages will be unsent for everyone and the chat will be removed for you.";

  const confirmActionButton = confirmAction === "clear" ? "Clear" : "Delete";

  const handleConfirmChatAction = async () => {
    if (!confirmAction) return;

    if (confirmAction === "clear") {
      await clearChatForMe(authUser?.email);
    } else {
      await deleteChatConversation(authUser?.email, authUser?._id);
      setSelectedPartner(null);
    }

    setConfirmAction(null);
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
            className={`text-base-content rounded-full w-9 sm:w-12 h-9 sm:h-12 flex items-center justify-center ${selectedPartner.photoURL || "border border-base-content"}`}
          >
            {selectedPartner.photoURL ? (
              <img src={selectedPartner.photoURL} alt={selectedPartner.name} />
            ) : (
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </div>
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-base-200 ${isOnline ? "bg-success" : "bg-gray-500"}`}
          ></span>
        </div>

        <div>
          <h3 className="text-sm sm:text-base font-medium">
            {selectedPartner?.name}
          </h3>
          <p className="text-xs sm:text-sm text-base-content/70">
            {presenceText}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className={`hidden sm:block transition-all duration-200 overflow-hidden ${isSearchOpen ? "w-32 sm:w-44 opacity-100" : "w-0 opacity-0"}`}
        >
          <div className="flex items-center gap-1 bg-base-200 rounded-full px-2 py-1">
            <Search className="size-4 text-base-content/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search messages"
              className="bg-transparent w-full text-xs sm:text-sm outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-base-content/60 hover:text-base-content"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => handleCall("video")}
          className="text-primary btn btn-sm btn-circle tooltip tooltip-bottom"
          data-tip="Video Call"
          aria-label="Start video call"
          disabled={!receiverId}
        >
          <Video className="size-[20px] sm:size-5" />
        </button>
        <button
          onClick={() => handleCall("audio")}
          className="text-primary btn btn-sm btn-circle tooltip tooltip-bottom"
          data-tip="Audio Call"
          aria-label="Start audio call"
          disabled={!receiverId}
        >
          <Phone className="size-[20px] sm:size-5" />
        </button>
        <button
          onClick={toggleSearch}
          className="hidden sm:inline-flex text-primary btn btn-sm btn-circle tooltip tooltip-bottom"
          data-tip="Search Messages"
          aria-label="Search messages"
        >
          <Search className="size-[20px] sm:size-5" />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="text-primary btn btn-sm btn-circle tooltip tooltip-bottom m-1"
            data-tip="More Options"
          >
            <MoreVertical className="size-[20px] sm:size-5" />
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button onClick={handleOpenProfileInfo} className="btn btn-sm">
                <Info size={16} /> Profile Info
              </button>
            </li>
            <li>
              <button onClick={handleAddToFavorites} className="btn btn-sm">
                <Heart size={16} className="text-pink-500" /> Add to fav
              </button>
            </li>
            <li>
              <button onClick={handleAddToList} className="btn btn-sm">
                <HeartPlus size={16} className="text-pink-500" /> Add to List
              </button>
            </li>
            <li>
              <button onClick={handleClearChat} className="btn btn-sm">
                <Eraser size={16} /> Clear chat
              </button>
            </li>
            <li>
              <button
                onClick={handleBlockUser}
                className="btn btn-sm hover:bg-red-500/20 hover:text-red-500"
              >
                <Ban size={16} /> Block ({partnerName})
              </button>
            </li>
            <li>
              <button
                onClick={handleReportUser}
                className="btn btn-sm hover:bg-red-500/20 hover:text-red-500"
              >
                <Flag size={16} /> Report ({partnerName})
              </button>
            </li>
            <li>
              <button
                onClick={handleDeleteChat}
                className="btn btn-sm hover:bg-red-500/30 hover:text-red-500"
              >
                <Trash2 size={16} /> Delete Chat
              </button>
            </li>
            <div className="h-px bg-base-100 my-1"></div>
            <li>
              <button
                onClick={() => setSelectedPartner(null)}
                className="btn btn-sm"
              >
                <XCircle size={16} /> Close Chat
              </button>
            </li>
          </ul>
        </div>
      </div>

      {isProfileInfoOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-base-100 w-full max-w-sm rounded-2xl border border-base-300 shadow-xl p-5 relative">
            <button
              type="button"
              onClick={() => setIsProfileInfoOpen(false)}
              className="btn btn-ghost btn-circle btn-sm absolute right-3 top-3"
              aria-label="Close profile info"
            >
              <X className="size-4" />
            </button>

            <div className="flex flex-col items-center text-center gap-3 mt-2">
              <div className="avatar">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-base-300 shadow-md overflow-hidden">
                  <img
                    src={selectedPartner?.photoURL || "/default-avatar.jpg"}
                    alt={selectedPartner?.name || "User"}
                  />
                </div>
              </div>
              <h3 className="font-semibold text-lg line-clamp-1 max-w-full">
                {selectedPartner?.name || "Unknown user"}
              </h3>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-base-content/70">
                <Circle
                  className={`size-2.5 ${isOnline ? "text-success" : "text-gray-400"}`}
                  fill="currentColor"
                />
                <span>{isOnline ? "Online" : "Offline"}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/80">
                <Mail className="size-4" />
                <span className="truncate">
                  {selectedPartner?.email || "Email not available"}
                </span>
              </div>

              <p className="text-base-content/70">
                {isOnline
                  ? "Active now"
                  : formatLastSeen(selectedPartner?.lastSeen, Date.now())}
              </p>
            </div>
          </div>
        </div>
      )}

      {confirmAction && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-base-100 w-full max-w-sm rounded-2xl border border-base-300 shadow-xl p-5">
            <h3 className="text-lg font-semibold mb-2">{confirmActionTitle}</h3>
            <p className="text-sm text-base-content/70 mb-5">
              {confirmActionMessage}
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-error text-white"
                onClick={handleConfirmChatAction}
              >
                {confirmActionButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageHeader;
