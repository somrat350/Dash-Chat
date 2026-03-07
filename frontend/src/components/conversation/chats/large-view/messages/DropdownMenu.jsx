import { CornerUpLeft, Copy, Edit, Trash, Share2, Smile } from "lucide-react";
import { useMessageStore } from "../../../../../store/useMessageStore";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useAuthStore } from "../../../../../store/useAuthStore";

const DropdownMenu = ({
  message,
  onEdit,
  onClose,
  isMe,
  isDeleted,
  openDeleteModal,
  onReply,
}) => {
  const { addReaction, forwardMessage, removeMessageFromUI } =
    useMessageStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { authUser } = useAuthStore();
  return (
    <div className="absolute -top-10 right-0 mt-1 bg-white shadow-md rounded-md flex flex-col z-50 w-36">

    {/* delet messege logic  */}
      {isDeleted ? (
        <button
          className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm  cursor-pointer"
          onClick={() => {
            removeMessageFromUI(message._id);
            onClose();
          }}
        >
          <Trash size={16} /> Remove
        </button>
      ) : (
        <>
          {/* reply */}
         <button
  className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm cursor-pointer"
  onClick={() => {
    onReply(message);
    onClose();
  }}
>
  <CornerUpLeft size={16} className="text-gray-500" />
  Reply
</button>

          {/* copy */}
          <button
            className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(message.text);
              onClose();
            }}
          >
            <Copy size={16} /> Copy
          </button>

         {/* edit  */}
          {isMe && (
            <button
              className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
                onClose();
              }}
            >
              <Edit size={16} /> Edit
            </button>
          )}

          {/* delete */}
          <button
            className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              openDeleteModal();
              onClose();
            }}
          >
            <Trash size={16} /> Delete
          </button>

          {/* forward */}
          <button
            className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm cursor-pointer"
            onClick={() => {
              forwardMessage(message);
              onClose();
            }}
          >
            <Share2 size={16} /> Forward
          </button>

          {/* ract */}
         {!isDeleted && (
            <div className="relative">
              <button
                className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={16} /> React
              </button>

              {showEmojiPicker && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50">
                  <EmojiPicker
                    onEmojiClick={(emoji) =>
                      addReaction(message._id, emoji.emoji, authUser.email)
                    }
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DropdownMenu;