import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import MessagesContainer from "./MessagesContainer";
import InChatCallOverlay from "./InChatCallOverlay";

const MessagesView = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100 relative">
      <MessageHeader />
      <MessagesContainer />
      <MessageInput />
      <InChatCallOverlay />
    </div>
  );
};

export default MessagesView;
