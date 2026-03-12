import { useState, useEffect } from "react";
import {
  Check,
  CheckSquare,
  ChevronDown,
  CornerUpRight,
  Smile,
} from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import DropdownMenu from "./DropdownMenu";
import { useMessageStore } from "../../../../../store/useMessageStore";
import EditMessageModal from "./EditMessageModal";
import DeleteModal from "./DeleteModal";

const MessageBubble = ({ message, authUser }) => {
  const isMe = message.sender === authUser?.email;
  const isDeleted =
    message.status === "hide" ||
    (message.hiddenFor && message.hiddenFor.includes(authUser.email)) ||
    message.text === "This message was deleted";

  const { addReaction, deleteMessage, setReplyMessage } = useMessageStore();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const handleForward = () => {
    setShowForwardModal(true);
  };

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
          className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md text-sm shadow-md wrap-break-word
          ${isMe ? "bg-green-500 text-white rounded-br-sm" : "bg-white text-black rounded-bl-sm"}`}
        >
          {/* reply  */}
          {message.replyTo && (
            <div className="bg-gray-200 p-2 text-black  rounded-lg mb-1 text-xs border-l-4 border-green-500">
              <p className="font-semibold">{message.replyTo.sender}</p>

              <p className="truncate">{message.replyTo.text}</p>
            </div>
          )}
          {/* forword  */}

          {message.forwarded && (
            <p className="flex items-center text-[10px] text-gray-700 mb-1 italic gap-1">
              <CornerUpRight size={12} /> Forwarded
            </p>
          )}

          <p>
            {message.status === "hide" ||
            message.hiddenFor?.includes(authUser.email)
              ? "This message was deleted"
              : message.text}
          </p>

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

        {/* emoji button */}
        {!isDeleted && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEmoji(!showEmoji);
            }}
            className={`absolute top-1 opacity-0 group-hover:opacity-100 transition cursor-pointer
      ${isMe ? "-left-8" : "-right-8"}`}
          >
            <Smile size={16} className="text-gray-500" />
          </button>
        )}

        {/* emoji picker */}
        {showEmoji && !isDeleted && (
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
          className={`absolute top-1 opacity-0 group-hover:opacity-100 transition cursor-pointer ${isMe ? "right-0" : "right-0"}`}
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
              isMe={isMe}
              isDeleted={isDeleted}
              openDeleteModal={() => setShowDeleteModal(true)}
              onEdit={() => setShowEditModal(true)}
              onClose={() => setShowDropdown(false)}
              onReply={(msg) => setReplyMessage(msg)}
              onForward={handleForward}
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

        {/* delet modal  */}

        {showDeleteModal && (
          <DeleteModal
            isSender={isMe}
            onDeleteForMe={() => {
              deleteMessage(message._id, "me", authUser.email);
              setShowDeleteModal(false);
              setShowDropdown(false);
            }}
            onDeleteForEveryone={() => {
              deleteMessage(message._id, "everyone", authUser.email);
              setShowDeleteModal(false);
              setShowDropdown(false);
            }}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}

        {/* forward modal  */}
        {showForwardModal && (
          <ForwardModal
            message={message}
            onClose={() => setShowForwardModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
