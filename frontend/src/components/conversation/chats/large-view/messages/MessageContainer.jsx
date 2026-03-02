import { useEffect, useRef } from "react";
import { useMessageStore } from "../../../../../store/useMessageStore";
import { useAuthStore } from "../../../../../store/useAuthStore";
import MessageBubble from "./MessageBubble";

const MessageContainer = () => {
  const { authUser } = useAuthStore();
  const {
    selectedPartner,
    messages,
    isMessagesLoading,
    getMessagesByUserEmail,
  } = useMessageStore();

  const bottomRef = useRef();

  useEffect(() => {
    if (selectedPartner?.email)
      getMessagesByUserEmail(selectedPartner.email);
  }, [selectedPartner]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedPartner)
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-base-200 flex flex-col">
      {isMessagesLoading ? (
        <div className="text-center text-gray-400 text-sm">
          Loading messages...
        </div>
      ) : messages.length > 0 ? (
        messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            message={msg}
            authUser={authUser}
            
          />
        ))
      ) : (
        <div className="text-center text-gray-400 text-sm">
          No messages yet. Start the conversation!
        </div>
      )}
      
    </div>
  );
};

export default MessageContainer;