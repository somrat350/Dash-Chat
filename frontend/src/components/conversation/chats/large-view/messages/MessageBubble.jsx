import { useState, useEffect } from "react";
import { Check, CheckSquare, ChevronDown, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import DropdownMenu from "./DropdownMenu";
import { useMessageStore } from "../../../../../store/useMessageStore";
import EditMessageModal from "./EditMessageModal";

const MessageBubble = ({ message, authUser }) => {
  const isMe = message.sender === authUser?.email;
  const { addReaction } = useMessageStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    const closeAll = () => {
      setShowEmoji(false);
      setShowDropdown(false);
    };
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, []);

  return (
    <div className={`flex my-2 ${isMe ? "justify-end" : "justify-start"}`}>
      <div className="relative group">

        {/* message bubble */}
        <div
          className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md text-sm shadow-md break-words
          ${isMe ? "bg-green-500 text-white rounded-br-sm" : "bg-white text-black rounded-bl-sm"}`}
        >
          <p>{message.text}</p>

          {/* reactions */}
          {message.reactions?.length > 0 && (
            <div className="flex gap-1 mt-1">
              {message.reactions.map((r, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-0.5 rounded-full"
                >
                  {r.emoji}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-end items-center gap-1 mt-1 text-[10px]">
            <span>{formatTime(message.createdAt)}</span>
            {isMe &&
              (message.seen ? (
                <CheckSquare size={12} className="text-blue-300" />
              ) : (
                <Check size={12} />
              ))}
          </div>
        </div>

        {/* emoji  */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEmoji(!showEmoji);
          }}
          className={`absolute top-1 opacity-0 group-hover:opacity-100 transition
            ${isMe ? "-left-8" : "-right-8"}`}
        >
          <Smile size={16} className="text-gray-500" />
        </button>

        {/* emoji picker */}
        {showEmoji && (
          <div
            className={`absolute z-50 mt-2 ${isMe ? "-left-60" : "left-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                addReaction(message._id, emojiData.emoji, authUser.email);
                setShowEmoji(false);
              }}
            />
          </div>
        )}

        {/* dropdown */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className={`absolute top-1 opacity-0 group-hover:opacity-100 transition ${isMe ? "right-0" : "right-0"}`}
        >
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        {/* dropdown menu */}
        {showDropdown && (
          <div
            className={`absolute mt-1 z-50 ${isMe ? "right-0" : "-right-30"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenu
              message={message}
              onEdit={() => setShowEditModal(true)}
               onClose={() => setShowDropdown(false)}
            />
          </div>
        )}

        {/* edit modal */}
        {showEditModal && (
          <EditMessageModal
            message={message}
            onClose={() => setShowEditModal(false)}
          />
        )}

      </div>
    </div>
  );
};

export default MessageBubble; 