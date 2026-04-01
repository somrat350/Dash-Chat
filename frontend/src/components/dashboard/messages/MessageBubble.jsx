import Waveform from "./Waveform";
import {
  EllipsisVertical,
  Phone,
  PhoneMissed,
  Plus,
  Smile,
  Video,
  Check,
  CheckCheck,
  CornerUpRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useMessageBubbleStore } from "../../../store/useMessageBubbleStore";
import DropdownMenu from "./DropdownMenu";
import ForwardMessageModal from "./ForwardMessageModal";

const quickEmojis = ["👍", "❤️", "😀", "😭", "🙏", "👎", "😡"];

// ✅ Separate Audio Component
const AudioMessage = ({ src, createdAt, renderMessageStatusTick }) => {
  const [waveformAnimate, setWaveformAnimate] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handlePlay = () => setWaveformAnimate(true);
    const handlePause = () => setWaveformAnimate(false);
    const handleEnded = () => setWaveformAnimate(false);

    audioEl.addEventListener("play", handlePlay);
    audioEl.addEventListener("pause", handlePause);
    audioEl.addEventListener("ended", handleEnded);

    return () => {
      audioEl.removeEventListener("play", handlePlay);
      audioEl.removeEventListener("pause", handlePause);
      audioEl.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="flex flex-col items-start gap-1 mt-2 w-full">
      <div className="w-full flex items-center gap-2">
        <audio
          controls
          src={src}
          ref={audioRef}
          className="w-full max-w-40 sm:max-w-48"
        />
        <Waveform
          barCount={24}
          color="#00f0ff"
          height={24}
          animate={waveformAnimate}
          audio={audioRef.current}
        />
      </div>

      <p className="text-[10px] opacity-60 flex items-center gap-0.5 self-end">
        {new Date(createdAt).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
        {renderMessageStatusTick()}
      </p>
    </div>
  );
};

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
  const [showActions, setShowActions] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const longPressTimer = useRef(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;

  const isMe = msg.senderId === authUser?._id;

  const isDeleted =
    msg.status === "hide" || msg.text === "This message was deleted";

  const isCallMessage = msg.messageType === "call";
  const callType = msg.callData?.callType || "audio";
  const callStatus = msg.callData?.status || "completed";

  const deletedLabel = isMe
    ? "You unsent this message"
    : "This message was deleted";

  const messageShapeClass = isMe
    ? `${isFirstInGroup ? "rounded-tr-md" : "rounded-tr-2xl"} ${
        isGroupedWithNext ? "rounded-br-md" : "rounded-br-2xl"
      }`
    : `${isFirstInGroup ? "rounded-tl-md" : "rounded-tl-2xl"} ${
        isGroupedWithNext ? "rounded-bl-md" : "rounded-bl-2xl"
      }`;

  // Long press (mobile)
  const handleTouchStart = () => {
    if (!isMobile) return;
    longPressTimer.current = setTimeout(() => {
      setShowActions(true);
    }, 400);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  useEffect(() => {
    if (!isMobile || !showActions) return;
    const close = () => setShowActions(false);
    document.addEventListener("touchstart", close);
    return () => document.removeEventListener("touchstart", close);
  }, [showActions, isMobile]);

  const renderMessageStatusTick = () => {
    if (msg.deliveryStatus === "seen") {
      return <CheckCheck size={14} className="text-blue-400" strokeWidth={3} />; // Blue double tick - message seen/read
    }
    if (msg.deliveryStatus === "delivered") {
      return <CheckCheck size={14} className="text-gray-400" strokeWidth={3} />; // Gray double tick - message delivered (recipient online)
    }
    return <Check size={14} className="text-gray-400" strokeWidth={3} />; // Single tick - message sent (recipient offline)
  };

  const handleQuickReaction = (emoji) => {
    addReaction(msg._id, emoji);
  };

  const handleCustomReaction = (emojiData) => {
    addReaction(msg._id, emojiData.emoji);
  };

  return (
    <div
      className={`chat relative group ${isMe ? "chat-end" : "chat-start"}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`chat-bubble relative px-2.5 sm:px-3 py-1.5 max-w-[92vw] sm:max-w-[85%] break-words ${messageShapeClass} ${
          isMe ? "bg-slate-800 text-white" : "bg-slate-500 text-white"
        }`}
      >
        {/* Reaction */}
        {msg.reaction && (
          <div
            className={`absolute -bottom-4 bg-base-200 rounded-full ${
              isMe ? "right-0" : "left-0"
            }`}
          >
            <button
              onClick={() => removeReaction(msg._id)}
              className="text-lg px-1"
            >
              {msg.reaction}
            </button>
          </div>
        )}

        {/* Actions */}
        <div
          className={`absolute gap-1.5 sm:gap-2 top-1.5 sm:top-2 ${isMe ? "-left-16 sm:-left-20" : "-right-16 sm:-right-20"} ${
            isMobile
              ? showActions
                ? "flex"
                : "hidden"
              : "group-hover:flex hidden"
          }`}
        >
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsOpen(null);
            }}
            className="btn btn-xs sm:btn-sm btn-circle"
          >
            <EllipsisVertical />
          </button>

          {isMenuOpen && (
            <DropdownMenu
              msg={msg}
              isMe={isMe}
              isDeleted={isDeleted}
              onClose={() => setIsMenuOpen(false)}
              onForward={() => setShowForwardModal(true)}
            />
          )}

          {!isDeleted && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-xs sm:btn-sm btn-circle"
            >
              <Smile />
            </button>
          )}
        </div>

        {/* Reply */}
        {msg.replyTo && (
          <div className="bg-black/20 p-2 rounded-lg mb-2 text-xs">
            <p className="font-bold text-primary">
              {msg.replyTo.senderId === authUser._id ? "You" : "Them"}
            </p>
            <p className="truncate italic">{msg.replyTo.text || "📷 Image"}</p>
          </div>
        )}

        {msg.forwarded && (
          <p className="mb-1 flex items-center gap-1 text-[10px] italic opacity-70">
            <CornerUpRight size={11} /> Forwarded
          </p>
        )}

        {/* Image */}
        {msg.image && (
          <img
            src={msg.image}
            alt="Shared"
            className="rounded-lg w-full max-w-64 sm:max-w-72 h-auto max-h-56 object-cover"
          />
        )}

        {/* Audio */}
        {msg.audio ? (
          <AudioMessage
            src={msg.audio}
            createdAt={msg.createdAt}
            renderMessageStatusTick={renderMessageStatusTick}
          />
        ) : isCallMessage ? (
          <div className="mt-2 min-w-0 w-full sm:min-w-52">
            <div className="flex items-center gap-2 font-semibold">
              {callStatus === "missed" ? (
                <PhoneMissed size={16} />
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
          </div>
        ) : (
          <div className="mt-1 flex items-end gap-1.5 min-w-0">
            <p
              className={`break-words whitespace-pre-wrap flex-1 ${msg.status === "hide" ? "opacity-50 italic" : ""}`}
            >
              {msg.status === "hide" ? deletedLabel : msg.text}
            </p>

            <p className="text-[10px] opacity-60 flex items-center gap-0.5 whitespace-nowrap flex-shrink-0">
              {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              {renderMessageStatusTick()}
            </p>
          </div>
        )}

        {/* Emoji Picker Popup */}
        {isOpen && !isDeleted && (
          <div
            className={`absolute top-full mt-2 z-50 bg-base-200 rounded-lg shadow-lg w-[min(92vw,320px)] ${isMe ? "right-0" : "left-0"}`}
          >
            {/* Quick Emojis */}
            <div className="flex gap-1 p-2 border-b border-base-300">
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    handleQuickReaction(emoji);
                    setIsOpen(false);
                  }}
                  className="text-xl p-2 hover:bg-base-300 rounded-lg transition-colors"
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="btn btn-ghost btn-xs sm:btn-sm btn-circle text-lg"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Full Emoji Picker */}
            {isEmojiPickerOpen && (
              <div className="p-2">
                <EmojiPicker
                  onEmojiClick={handleCustomReaction}
                  autoFocusSearch={false}
                  height={300}
                  width={"100%"}
                  theme="dark"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {showForwardModal && (
        <ForwardMessageModal
          message={msg}
          authUserId={authUser?._id}
          onClose={() => setShowForwardModal(false)}
        />
      )}
    </div>
  );
};

export default MessageBubble;
