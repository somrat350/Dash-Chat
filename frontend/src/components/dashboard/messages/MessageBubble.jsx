import { EllipsisVertical, Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { useMessageBubbleStore } from "../../../store/useMessageBubbleStore";
import DropdownMenu from "./DropdownMenu";

const quickEmojis = ["👍", "❤️", "😀", "😭", "🙏", "👎", "😡"];
const MessageBubble = ({ msg, authUser, isOpen, setIsOpen }) => {
  const { addReaction } = useMessageBubbleStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMe = msg.senderId === authUser?._id;

  const isDeleted =
    msg.status === "hide" || msg.text === "This message was deleted";

  useEffect(() => {
    const closeAll = () => {
      setIsOpen(null);
      setIsMenuOpen(false);
    };
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, [setIsOpen]);
  return (
    <div
      key={msg._id}
      className={`chat relative group ${isMe ? "chat-end" : "chat-start"}`}
    >
      <div
        className={`chat-bubble relative ${
          isMe ? "bg-slate-800 text-white" : "bg-slate-500 text-white"
        }`}
      >
        {/* Message Reaction */}
        <div
          className={`absolute -bottom-4 bg-base-200 rounded-full ${isMe ? "right-0" : "left-0"}`}
        >
          <span className="text-lg">{msg.reaction}</span>
        </div>

        {/* Reaction Modal */}
        {isOpen && !isDeleted && (
          <div
            className={`z-60 absolute top-2 flex gap-2 justify-between items-center bg-base-100 px-4 py-2 rounded-full ${isMe ? "right-2" : "left-2"}`}
          >
            {quickEmojis.map((e, i) => (
              <span
                key={i}
                onClick={() => addReaction(msg._id, e, authUser._id)}
                className="cursor-pointer text-2xl hover:scale-120"
              >
                {e}
              </span>
            ))}
          </div>
        )}

        {/* Bubble Action Buttons */}
        <div
          className={`absolute group-hover:flex gap-2 hidden top-2 ${isMe ? "-left-10" : "-right-20"}`}
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
          {!isMe && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className={`btn btn-sm btn-circle`}
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
        <p className="mt-2">
          {msg.status === "hide" ? "This message was deleted" : msg?.text}
        </p>

        {/* Message Date */}
        <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
          {new Date(msg.createdAt).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
