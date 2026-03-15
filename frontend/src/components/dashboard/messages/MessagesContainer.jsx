import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMessageStore } from "../../../store/useMessageStore";
import MessageBubble from "./MessageBubble";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const MessagesContainer = () => {
  const messageEndRef = useRef(null);
  const { authUser, socket } = useAuthStore();
  const [activeEmojiId, setActiveEmojiId] = useState(null);

  const {
    messages,
    selectedPartner,
    isMessagesLoading,
    isMessageSending,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
    clearReplyMessage,
  } = useMessageStore();

  useEffect(() => {
    if (!selectedPartner || !socket) return;
    getMessagesByUserId(selectedPartner._id);
    subscribeToMessage(selectedPartner._id);
    return () => unsubscribeFromMessage();
  }, [
    socket,
    selectedPartner,
    isMessageSending,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
  ]);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [messages]);
  useEffect(() => {
    clearReplyMessage();
    return () => {
      clearReplyMessage();
    };
  }, [clearReplyMessage]);
  return (
    <div className="overflow-y-auto scroll-thin h-full flex-1 py-5">
      <div className="w-full p-4 flex flex-col gap-3">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          "not found"
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg._id}
                msg={msg}
                authUser={authUser}
                isOpen={activeEmojiId === msg._id}
                setIsOpen={(isOpen) =>
                  setActiveEmojiId(isOpen ? msg._id : null)
                }
              />
            ))}
            <div ref={messageEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesContainer;
