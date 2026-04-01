import Waveform from "./Waveform";
import {
  EllipsisVertical,
  Phone,
  PhoneMissed,
  Plus,
  Smile,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useMessageBubbleStore } from "../../../store/useMessageBubbleStore";
import DropdownMenu from "./DropdownMenu";

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
    <div className="flex flex-col items-center gap-1 mt-2">
      <div className="w-full flex items-center gap-2">
        <audio controls src={src} ref={audioRef} className="w-40" />
        <Waveform
          barCount={24}
          color="#00f0ff"
          height={24}
          animate={waveformAnimate}
          audio={audioRef.current}
        />
      </div>

      <p className="text-[10px] opacity-60 flex items-center gap-0.5">
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
    if (msg.deliveryStatus === "read") return "✔✔";
    if (msg.deliveryStatus === "delivered") return "✔✔";
    return "✔";
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
        className={`chat-bubble relative px-3 py-1.5 max-w-[85%] break-words ${messageShapeClass} ${
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
          className={`absolute gap-2 top-2 ${
            isMe ? "-left-20" : "-right-20"
          } ${
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
            className="btn btn-sm btn-circle"
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
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-sm btn-circle"
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
            <p className="truncate italic">
              {msg.replyTo.text || "📷 Image"}
            </p>
          </div>
        )}

        {/* Image */}
        {msg.image && (
          <img
            src={msg.image}
            alt="Shared"
            className="rounded-lg h-48 object-cover"
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
          <div className="mt-2 min-w-52">
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
          <div className="mt-1 flex items-end gap-1">
            <p className="break-words whitespace-pre-wrap flex-1">
              {msg.status === "hide" ? deletedLabel : msg.text}
            </p>

            <p className="text-[10px] opacity-60">
              {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              {renderMessageStatusTick()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
