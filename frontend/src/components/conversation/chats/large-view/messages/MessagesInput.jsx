import { useRef, useState } from "react";
import { Smile, Plus, Mic, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import AttachmentMenu from "../messages/AttachmentMenu";
import { useMessageStore } from "../../../../../store/useMessageStore";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { useAppearanceStore } from "../../../../../store/useAppearanceStore";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const textareaRef = useRef(null);

  const { sendMessage, selectedPartner, replyMessage, clearReplyMessage } = useMessageStore();
  const { authUser } = useAuthStore();
  const enterToSend = useAppearanceStore((state) => state.enterToSend);
  console.log("enterToSend:", enterToSend);

  const handleSend = () => {
    if (!message.trim()) return;
    const messageData = {

      sender: authUser.email,
      senderName: authUser.name,
      receiver: selectedPartner.email,
      text: message,
      replyTo: replyMessage?._id,
      replyToSenderName: replyMessage?.senderName || replyMessage?.sender,
      replyToText: replyMessage?.text,
    };
    sendMessage(messageData);
    setMessage("");
    setShowEmoji(false);
    textareaRef.current.style.height = "auto";
    clearReplyMessage();
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
    setShowAttachment(!showAttachment);
  };

  return (
    <div className="relative w-full bg-primary/40 p-3">
      {replyMessage && (
        <div className="bg-gray-100 border-l-4 border-green-500 px-3 py-2 mb-2 rounded flex justify-between items-start text-sm max-w-full">
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-gray-700 truncate">
              {replyMessage.sender}
            </span>
            <span className="text-gray-600 truncate">
              {replyMessage.text}
            </span>
          </div>
          <button
            className="text-gray-500 font-bold ml-2"
            onClick={clearReplyMessage}
          >
            ✕
          </button>
        </div>
      )}


      <div className="flex items-end gap-2 bg-white rounded-2xl px-3 py-2 shadow-sm relative">
        {/* emoji, attachment, mic are send ,emoji picker,attachment menu etc here */}
        <Smile
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowEmoji(!showEmoji)}
        />

        <Plus
          className="cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => setShowAttachment(!showAttachment)}
        />

        <textarea
          ref={textareaRef}
          rows="1"
          value={message}
          placeholder="Type a message"
          className="flex-1 resize-none overflow-auto bg-transparent outline-none text-sm max-h-40"
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && enterToSend && !e.shiftKey) {
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
