import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import ComponentsLoader from "../../ComponentsLoader";
import { useParams } from "react-router";
import { useMessageStore } from "../../../store/useMessageStore";

import MessageBubble from "./MessageBubble";

const MessagesContainer = () => {
  const { id } = useParams();
  const messageEndRef = useRef(null);
  const { authUser, socket } = useAuthStore();
  const [activeEmojiId, setActiveEmojiId] = useState(null);

  const {
    messages,
    messagesLoading,
    isMessageSending,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
    clearReplyMessage,
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
  useEffect(() => {
    clearReplyMessage();
    return () => {
      clearReplyMessage();
    };
  }, [id, clearReplyMessage]);
  return (
    <div className="overflow-y-auto h-full flex-1 mb-20">
      {messages.length > 0 && !messagesLoading ? (
        <div className="w-full p-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              msg={msg}
              authUser={authUser}
              isOpen={activeEmojiId === msg._id}
              setIsOpen={(isOpen) => setActiveEmojiId(isOpen ? msg._id : null)}
            />
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
