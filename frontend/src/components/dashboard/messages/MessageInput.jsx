import EmojiPicker from "emoji-picker-react";
import { Smile, Plus, Mic, XIcon, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMessageStore } from "../../../store/useMessageStore";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";

const TYPING_IDLE_MS = 1200;

const MessageInput = () => {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiRef = useRef(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const {
    sendMessage,
    isMessageSending,
    replyMessage,
    clearReplyMessage,
    selectedPartner,
  } = useMessageStore();
  const { socket } = useAuthStore();

  const receiverId =
    selectedPartner?._id ||
    selectedPartner?.id ||
    selectedPartner?.userId ||
    selectedPartner?.user?._id;

  const emitTypingStatus = (isTyping) => {
    if (!socket?.connected || !receiverId) return;

    socket.emit("typingStatus", {
      toUserId: String(receiverId),
      isTyping,
    });
  };

  const stopTyping = () => {
    if (!isTypingRef.current) return;

    isTypingRef.current = false;
    emitTypingStatus(false);

    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const scheduleTypingStop = () => {
    if (typingTimeoutRef.current) {
      window.clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = window.setTimeout(() => {
      stopTyping();
    }, TYPING_IDLE_MS);
  };

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
    const nextText = e.target.value;
    setText(nextText);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    const lineHeight = parseInt(window.getComputedStyle(e.target).lineHeight);
    const lines = Math.round(e.target.scrollHeight / lineHeight);

    setIsMultiLine(lines > 1);

    if (!nextText.trim()) {
      stopTyping();
      return;
    }

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      emitTypingStatus(true);
    }

    scheduleTypingStop();
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

  const uploadImage = async (userImage) => {
    const formData = new FormData();
    const base64 = userImage.split(",")[1];
    formData.append("image", base64);
    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API}`;
    const res = await axios.post(imgApiUrl, formData);
    return res.data.data.url;
  };

  const handleSend = async () => {
    if (!text.trim() && !imagePreview) return;

    stopTyping();

    let image = "";

    if (imagePreview) {
      image = await uploadImage(imagePreview);
    }

    sendMessage({
      text: text.trim(),
      image,
      replyTo: replyMessage?._id || null,
    });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      stopTyping();
    };
  }, []);

  useEffect(() => {
    stopTyping();
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsMultiLine(false);
  }, [receiverId]);

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

          {text.trim().length === 0 && !imagePreview ? (
            <button className="btn btn-primary btn-circle hover:scale-110 transition">
              <Mic />
            </button>
          ) : isMessageSending ? (
            <span className="loading loading-spinner loading-xl"></span>
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
