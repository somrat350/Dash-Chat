import {
  Check,
  CheckCheck,
  EllipsisVertical,
  Phone,
  PhoneMissed,
  Plus,
  Smile,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useMessageBubbleStore } from "../../../store/useMessageBubbleStore";
import DropdownMenu from "./DropdownMenu";

const quickEmojis = ["👍", "❤️", "😀", "😭", "🙏", "👎", "😡"];

const MessageBubble = ({
  msg,
  authUser,
  isOpen,
  setIsOpen,
  isFirstInGroup = true,
  isGroupedWithNext = false,
}) => {
  const { addReaction, removeReaction } = useMessageBubbleStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [tickAnimating, setTickAnimating] = useState(false);
  const isMe = msg.senderId === authUser?._id;
  const canRemoveReaction =
    !!msg.reactionBy && String(msg.reactionBy) === String(authUser?._id);

  const isDeleted =
    msg.status === "hide" || msg.text === "This message was deleted";
  const isCallMessage = msg.messageType === "call";
  const callType = msg.callData?.callType || "audio";
  const callStatus = msg.callData?.status || "completed";
  const deliveryStatus = msg.deliveryStatus || "sent";
  const deletedLabel = isMe
    ? "You unsent this message"
    : "This message was deleted";

  const messageShapeClass = isMe
    ? `${isFirstInGroup ? "rounded-tr-md" : "rounded-tr-2xl"} ${isGroupedWithNext ? "rounded-br-md" : "rounded-br-2xl"}`
    : `${isFirstInGroup ? "rounded-tl-md" : "rounded-tl-2xl"} ${isGroupedWithNext ? "rounded-bl-md" : "rounded-bl-2xl"}`;

  useEffect(() => {
    if (!isMe) return;
    const timeoutId1 = setTimeout(() => {
      setTickAnimating(true);
      const timeoutId2 = setTimeout(() => setTickAnimating(false), 240);
      return () => clearTimeout(timeoutId2);
    }, 0);
    return () => clearTimeout(timeoutId1);
  }, [deliveryStatus, isMe]);

  const renderMessageStatusTick = () => {
    if (!isMe) return null;

    const baseTickClass = `transition-all duration-300 ${
      tickAnimating ? "scale-110 opacity-100" : "scale-100 opacity-90"
    }`;

    if (deliveryStatus === "seen") {
      return (
        <CheckCheck size={14} className={`${baseTickClass} text-sky-300`} />
      );
    }

    if (deliveryStatus === "delivered") {
      return (
        <CheckCheck size={14} className={`${baseTickClass} text-white/80`} />
      );
    }

    return <Check size={14} className={`${baseTickClass} text-white/80`} />;
  };

  useEffect(() => {
    const closeAll = () => {
      setIsOpen(null);
      setIsMenuOpen(false);
      setIsEmojiPickerOpen(false);
    };
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, [setIsOpen]);

  const handleQuickReaction = (emoji) => {
    addReaction(msg._id, emoji, authUser._id);
    setIsEmojiPickerOpen(false);
    setIsOpen(null);
  };

  const handleCustomReaction = (emojiData) => {
    addReaction(msg._id, emojiData.emoji, authUser._id);
    setIsEmojiPickerOpen(false);
    setIsOpen(null);
  };
  return (
    <div
      key={msg._id}
      className={`chat relative group ${isMe ? "chat-end" : "chat-start"}`}
    >
      <div
        className={`chat-bubble relative px-3 py-1.5 transition-colors duration-300 max-w-[85%] sm:max-w-md md:max-w-lg break-words ${messageShapeClass} ${
          isMe ? "bg-slate-800 text-white" : "bg-slate-500 text-white"
        }`}
      >
        {/* Message Reaction */}
        <div
          className={`absolute -bottom-4 bg-base-200 rounded-full ${isMe ? "right-0" : "left-0"}`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (!msg.reaction || !canRemoveReaction) return;
              removeReaction(msg._id);
            }}
            className={`text-lg px-1 ${canRemoveReaction ? "cursor-pointer" : "cursor-default"}`}
            aria-label={canRemoveReaction ? "Remove reaction" : "Reaction"}
            title={
              canRemoveReaction
                ? "Click to remove reaction"
                : "Only the reactor can remove"
            }
          >
            {msg.reaction}
          </button>
        </div>

        {/* Reaction Modal */}
        {isOpen && !isDeleted && (
          <div className={`z-60 absolute top-2 ${isMe ? "right-2" : "left-2"}`}>
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex gap-2 justify-between items-center bg-base-100 px-4 py-2 rounded-full"
            >
              {quickEmojis.map((e, i) => (
                <span
                  key={i}
                  onClick={() => handleQuickReaction(e)}
                  className="cursor-pointer text-2xl hover:scale-120"
                >
                  {e}
                </span>
              ))}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEmojiPickerOpen((prev) => !prev);
                }}
                className="btn btn-xs btn-circle border border-base-content/20 bg-base-300/80 text-base-content hover:bg-primary/20"
                aria-label="Add more emojis"
              >
                <Plus size={16} />
              </button>
            </div>

            {isEmojiPickerOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute mt-2 ${isMe ? "right-0" : "left-0"}`}
              >
                <EmojiPicker
                  onEmojiClick={handleCustomReaction}
                  width={280}
                  height={360}
                />
              </div>
            )}
          </div>
        )}

        {/* Bubble Action Buttons */}
        <div
          className={`absolute group-hover:flex gap-2 hidden top-2 ${isMe ? "-left-20" : "-right-20"}`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
              setIsOpen(null);
            }}
            className={`btn btn-sm btn-circle`}
          >
            <EllipsisVertical />
          </button>
          {isMenuOpen && (
            <DropdownMenu
              msg={msg}
              isMe={isMe}
              isDeleted={isDeleted}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
          {!isDeleted && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                setIsOpen(!isOpen);
              }}
              className={`btn btn-sm btn-circle`}
              aria-label="React to message"
            >
              <Smile />
            </button>
          )}
        </div>

        {/* Reply To */}
        {msg.replyTo && (
          <div className="bg-black/20 p-2 rounded-lg mb-2 border-l-4 border-primary text-xs opacity-90 cursor-pointer hover:bg-black/30 transition-all max-w-50">
            <p className="font-bold text-primary mb-1">
              {msg.replyTo.senderId === authUser._id ? "You" : "Them"}
            </p>
            <p className="truncate italic">
              {msg.replyTo.text ? msg.replyTo.text : "📷 Image"}
            </p>
          </div>
        )}

        {/* Message Image */}
        {msg.image && (
          <img
            src={msg.image}
            alt="Shared"
            className="rounded-lg h-48 object-cover"
          />
        )}

        {/* Message Text */}
        {isCallMessage ? (
          <div className="mt-2 min-w-52">
            <div className="flex items-center gap-2 font-semibold">
              {callStatus === "missed" ? (
                <PhoneMissed size={16} className="text-red-300" />
              ) : callType === "video" ? (
                <Video size={16} />
              ) : (
                <Phone size={16} />
              )}
              <span>{callType === "video" ? "Video" : "Audio"} call</span>
            </div>
            <p className="mt-2 text-sm opacity-90">
              {callStatus === "missed"
                ? "Missed call"
                : callStatus === "rejected"
                  ? "Call declined"
                  : callStatus === "cancelled"
                    ? "Call cancelled"
                    : callStatus === "failed"
                      ? "Call disconnected"
                      : "Call ended"}
            </p>
            {!msg.callData && msg.text && (
              <p className="mt-1 text-xs opacity-70">{msg.text}</p>
            )}
          </div>
        ) : (
          <div className="mt-1 flex items-end gap-1 min-w-0">
            <p
              className={`leading-relaxed break-words break-all whitespace-pre-wrap min-w-0 flex-1 ${
                msg.status === "hide"
                  ? "opacity-80 blur-[0.6px] italic"
                  : "opacity-100"
              }`}
            >
              {msg.status === "hide" ? deletedLabel : msg?.text}
            </p>

            {/* Message Date */}
            <p
              className={`text-[10px] opacity-60 flex items-center gap-0.5 whitespace-nowrap shrink-0`}
            >
              {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              {renderMessageStatusTick()}
            </p>
          </div>
        )}

        {/* Message Date Placeholder for spacing */}
      </div>
    </div>
  );
};

export default MessageBubble;
