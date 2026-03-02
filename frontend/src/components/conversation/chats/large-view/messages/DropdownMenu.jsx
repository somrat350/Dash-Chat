import { CornerUpLeft, Copy, Edit, Trash, Share2, Smile } from "lucide-react";
import { useMessageStore } from "../../../../../store/useMessageStore";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const DropdownMenu = ({ message }) => {
  const { authUser, setReplyMessage, setEditingMessage, addReaction, forwardMessage, deleteMessage } = useMessageStore();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="absolute -top-10 right-0 mt-1 bg-white shadow-md rounded-md flex flex-col z-50 w-36">
      <button className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
       onClick={() => setReplyMessage(message)}>
        <CornerUpLeft size={16} /> Reply
      </button>

      <button className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm" 
      onClick={() => navigator.clipboard.writeText(message.text)}>
        <Copy size={16} /> Copy
      </button>

      <button className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
       onClick={() => setEditingMessage(message)}>
        <Edit size={16} /> Edit
      </button>

      <button className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm" 
      onClick={() => deleteMessage(message._id)}>
        <Trash size={16} /> Delete
      </button>

      <button className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm" 
      onClick={() => forwardMessage(message)}>
        <Share2 size={16} /> Forward
      </button>

      <div className="relative">
        <button className="p-2 flex items-center gap-2 hover:bg-gray-100 text-sm"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Smile size={16} /> React
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50">
            <EmojiPicker 
            onEmojiClick={(emoji) => addReaction(message._id, emoji.emoji, authUser.email)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;