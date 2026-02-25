import { useRef } from "react";
import { Smile, Plus, Mic, Send } from "lucide-react";
import { useChatStore } from "../../../../../store/useChatStore";
import EmojiPicker from "emoji-picker-react";
import AttachmentMenu from "../messages/AttachmentMenu";

export default function MessageInput() {
  const {
    message,
    setMessage,
    clearMessage,
    showEmoji,
    toggleEmoji,
    showAttachment,
    toggleAttachment,
  } = useChatStore();

  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Sent:", message);
    clearMessage();
    textareaRef.current.style.height = "auto";
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const handleAttachmentSelect = (type) => {
    console.log("Selected:", type);
    toggleAttachment(); 
  };

  return (
    <div className="relative w-full bg-[#f0f2f5] p-3">

    
      <div className="flex items-end gap-2 bg-white rounded-2xl px-3 py-2 shadow-sm relative">

        {/* emoji, attachment, mic are send ,emoji picker,atachment menu etc here */}
        <Smile
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={toggleEmoji}
        />

        
        <Plus
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={toggleAttachment}
        />

        <textarea
          ref={textareaRef}
          rows="1"
          value={message}
          placeholder="Type a message"
          className="flex-1 resize-none overflow-hidden bg-transparent outline-none text-sm max-h-32"
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

      
        {message.trim().length === 0 ? (
          <Mic className="cursor-pointer text-gray-500 hover:text-gray-700" />
        ) : (
          <Send
            className="cursor-pointer text-green-500 hover:scale-110 transition"
            onClick={handleSend}
          />
        )}
      </div>

   
      {showEmoji && (
        <div className="absolute bottom-full left-0 mb-2 z-40">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      
      {showAttachment && <AttachmentMenu onSelect={handleAttachmentSelect} />}

    </div>
  );
}