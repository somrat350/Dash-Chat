import { useEffect } from "react";
import ChatHeader from "../large-view/messages/ChatHeader";
import MessageContainer from "../large-view/messages/MessageContainer";
import MessageInput from "../large-view/messages/MessagesInput";
import { useMessageStore } from "../../../../store/useMessageStore";

const ChatContainer = () => {
  const { selectedPartner, getMessagesByUserEmail } = useMessageStore();

  useEffect(() => {
    if (!selectedPartner?.email) return;
    getMessagesByUserEmail(selectedPartner.email);
  }, [selectedPartner, getMessagesByUserEmail]);

  return (
    <div className="h-[100dvh] flex flex-col bg-base-100">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <MessageContainer />
      </div>
      <div className="border-t border-primary/20">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
