import Waveform from "./Waveform";
import EmojiPicker from "emoji-picker-react";
import {
  Smile,
  Plus,
  Mic,
  XIcon,
  Send,
  X,
  StopCircle,
  Play,
} from "lucide-react";
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
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [isAttachmentLoading, setIsAttachmentLoading] = useState(false);
  const [attachmentProgress, setAttachmentProgress] = useState(0);
  const audioChunksRef = useRef([]);
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
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsAttachmentLoading(true);
    setAttachmentProgress(0);

    const reader = new FileReader();
    reader.onloadstart = () => setAttachmentProgress(10);
    reader.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const percent = Math.max(
        10,
        Math.min(70, Math.round((event.loaded / event.total) * 70)),
      );
      setAttachmentProgress(percent);
    };
    reader.onload = () => {
      setImagePreview(reader.result);
      setAttachmentProgress(100);
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
      setAttachmentProgress(0);
      setIsAttachmentLoading(false);
    };
    reader.onloadend = () => {
      setTimeout(() => {
        setIsAttachmentLoading(false);
        setAttachmentProgress(0);
      }, 250);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setIsAttachmentLoading(false);
    setAttachmentProgress(0);
    if (textareaRef.current) textareaRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadImage = async (userImage) => {
    const formData = new FormData();
    const base64 = userImage.split(",")[1];
    formData.append("image", base64);
    const imgApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API}`;
    const res = await axios.post(imgApiUrl, formData, {
      onUploadProgress: (event) => {
        if (!event.total) {
          setAttachmentProgress(85);
          return;
        }
        const percent = Math.round((event.loaded / event.total) * 100);
        setAttachmentProgress(Math.min(100, percent));
      },
    });
    return res.data.data.url;
  };

  const handleSend = async () => {
    if (!text.trim() && !imagePreview && !audioBlob) {
      toast.error("Message content is required");
      return;
    }

    stopTyping();

    let image = "";
    let audio = "";

    if (imagePreview) {
      setIsAttachmentLoading(true);
      setAttachmentProgress(0);
      try {
        image = await uploadImage(imagePreview);
      } catch {
        toast.error("Image upload failed");
        setIsAttachmentLoading(false);
        setAttachmentProgress(0);
        return;
      }
    }

    if (audioBlob) {
      // Upload audio to server or cloud storage, here just using local URL for demo
      // You should replace this with your backend upload logic
      // Example: const audioUrl = await uploadAudio(audioBlob);
      audio = audioUrl;
    }

    await sendMessage({
      text: text.trim(),
      image,
      audio,
      replyTo: replyMessage?._id || null,
    });

    setText("");
    setImagePreview(null);
    setAudioBlob(null);
    setAudioUrl("");
    audioChunksRef.current = [];
    setIsAttachmentLoading(false);
    setAttachmentProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Voice recording logic
  const handleStartRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Audio recording not supported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream); // <-- set mediaStream for waveform
      const recorder = new window.MediaRecorder(stream);
      setMediaRecorder(recorder);
      audioChunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        setMediaStream(null); // <-- cleanup mediaStream after stop
      };
      recorder.start();
      setIsRecording(true);
    } catch {
      toast.error("Microphone access denied");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleRemoveAudio = () => {
    setAudioBlob(null);
    setAudioUrl("");
    audioChunksRef.current = [];
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
  // neww toooooooooooooooooooooo
  const [enterToSend, setEnterToSend] = useState(false);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("notificationSettings")) || {};
    setEnterToSend(settings.enterToSend || false);
  }, []);

  return (
    <>
      <div className="self-end p-4 bg-base-200 w-full relative">
        {(imagePreview || isAttachmentLoading) && (
          <div className="w-full mb-3 flex items-center">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                />
              ) : (
                <div className="w-20 h-20 rounded-lg border border-slate-700 bg-base-300" />
              )}

              {isAttachmentLoading && (
                <div className="absolute inset-0 rounded-lg bg-black/45 flex flex-col items-center justify-center gap-1 text-white">
                  <span className="loading loading-spinner loading-sm" />
                  <span className="text-[10px] font-medium">
                    {attachmentProgress > 0
                      ? `${attachmentProgress}%`
                      : "Buffering..."}
                  </span>
                </div>
              )}

              {!isAttachmentLoading && imagePreview && (
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 cursor-pointer"
                  type="button"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
        {isRecording && (
          <div className="w-full mb-3 flex items-center gap-2">
            {/* Live waveform animation while recording */}
            <div className="flex-1 flex items-center justify-center bg-black rounded-lg py-2">
              <span className="mr-2 text-xs text-cyan-300 animate-pulse">
                Recording...
              </span>
              <Waveform
                barCount={32}
                color="#00f0ff"
                height={32}
                animate={true}
                audioStream={mediaStream}
              />
            </div>
            <button
              onClick={handleStopRecording}
              className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700 cursor-pointer"
              type="button"
            >
              <StopCircle className="w-5 h-5" />
            </button>
          </div>
        )}
        {audioBlob && (
          <div className="w-full mb-3 flex items-center gap-2">
            <audio controls src={audioUrl} className="w-40" />
            <button
              onClick={handleRemoveAudio}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700 cursor-pointer"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
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
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" && !e.shiftKey) {
            //     e.preventDefault();
            //     handleSend();
            //   }
            // }}
            onKeyDown={(e) => {
              if (enterToSend) {
                // Enter to send ON
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              } else {
                // Enter to send OFF → Ctrl+Enter diye send (industry fallback)
                if (e.key === "Enter" && e.ctrlKey) {
                  e.preventDefault();
                  handleSend();
                }
              }
            }}
          />

          {text.trim().length === 0 && !imagePreview && !audioBlob ? (
            isRecording ? (
              <button
                className="btn btn-error btn-circle animate-pulse hover:scale-110 transition"
                onClick={handleStopRecording}
                type="button"
              >
                <StopCircle />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-circle hover:scale-110 transition"
                onClick={handleStartRecording}
                type="button"
              >
                <Mic />
              </button>
            )
          ) : isMessageSending || isAttachmentLoading ? (
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
          <div
            ref={emojiRef}
            className="absolute bottom-[calc(100%+8px)] left-4 z-50"
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </>
  );
};

export default MessageInput;
