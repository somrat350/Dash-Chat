import EmojiPicker from "emoji-picker-react";
import { Smile, Plus, Mic, XIcon, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMessageStore } from "../../../store/useMessageStore";
import { useParams } from "react-router";

const MessageInput = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  const { sendMessage, isMessageSending, replyMessage, clearReplyMessage } =
    useMessageStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiObject) => {
    setText(text + emojiObject.emoji);
  };

  const handleInput = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    const lineHeight = parseInt(window.getComputedStyle(e.target).lineHeight);
    const lines = Math.round(e.target.scrollHeight / lineHeight);

    setIsMultiLine(lines > 1);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (textareaRef.current) textareaRef.current.value = "";
  };

  const handleSend = () => {
    if (!text.trim() && !imagePreview) return;

    sendMessage(id, {
      text: text.trim(),
      image: imagePreview,
      replyTo: replyMessage?._id || null,
    });

    setText("");
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="self-end p-4 bg-base-200 w-full">
        {imagePreview && (
          <div className="w-full mb-3 flex items-center">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-slate-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 cursor-pointer"
                type="button"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {replyMessage && (
          <div className="flex items-center justify-between bg-base-300 p-2 rounded-lg mb-2 border-l-4 border-primary animate-in slide-in-from-bottom-2">
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-primary">
                Replying to {replyMessage.senderName}
              </span>
              <p className="text-sm truncate opacity-70">
                {replyMessage.text || "Image"}
              </p>
            </div>
            <button
              onClick={clearReplyMessage}
              className="btn btn-xs btn-circle btn-ghost"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div
          className={`flex ${isMultiLine ? "items-end" : "items-center"} gap-2 bg-base-100 rounded-2xl px-3 py-2 shadow-sm relative`}
        >
          <Smile
            className="cursor-pointer hover:text-primary hover:scale-110 transition"
            onClick={() => setShowEmoji(!showEmoji)}
          />

          <Plus
            className="cursor-pointer hover:text-primary hover:scale-110 transition"
            onClick={() => fileInputRef.current?.click()}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <textarea
            ref={textareaRef}
            rows="1"
            value={text}
            placeholder="Type your message..."
            className="flex-1 resize-none overflow-auto bg-transparent outline-none text-sm max-h-50"
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {text.trim().length === 0 ? (
            <button className="btn btn-primary btn-circle hover:scale-110 transition">
              <Mic />
            </button>
          ) : isMessageSending ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <button
              onClick={handleSend}
              className="btn btn-primary btn-circle hover:scale-110 transition"
            >
              <Send />
            </button>
          )}
        </div>

        {showEmoji && (
          <div ref={emojiRef} className="absolute bottom-full left-0 mb-2 z-40">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </>
  );
};

export default MessageInput;
