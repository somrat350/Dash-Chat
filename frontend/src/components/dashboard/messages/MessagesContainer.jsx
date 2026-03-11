import { useEffect, useRef } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import ComponentsLoader from "../../ComponentsLoader";
import { useParams } from "react-router";
import { useMessageStore } from "../../../store/useMessageStore";

const MessagesContainer = () => {
  const { id } = useParams();
  const messageEndRef = useRef(null);
  const { authUser, socket } = useAuthStore();
  const {
    messages,
    messagesLoading,
    isMessageSending,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
  } = useMessageStore();

  useEffect(() => {
    if (!id || !socket) return;
    getMessagesByUserId(id);
    subscribeToMessage(id);
    return () => unsubscribeFromMessage();
  }, [
    id,
    socket,
    isMessageSending,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
  ]);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="overflow-y-auto h-full flex-1 mb-16">
      {messages.length > 0 && !messagesLoading ? (
        <div className="w-full p-4 flex flex-col gap-2">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            >
              <div
                className={`chat-bubble relative ${
                  msg.senderId === authUser._id
                    ? "bg-slate-800 text-white"
                    : "bg-slate-500 text-white"
                }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Shared"
                    className="rounded-lg h-48 object-cover"
                  />
                )}
                {msg.text && <p className="mt-2">{msg.text}</p>}
                <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                  {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          ))}
          {/* 👇 scroll target */}
          <div ref={messageEndRef} />
        </div>
      ) : messagesLoading ? (
        <ComponentsLoader />
      ) : (
        "No message found."
      )}
    </div>
  );
};

export default MessagesContainer;
