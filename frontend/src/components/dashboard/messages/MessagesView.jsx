import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import MessagesContainer from "./MessagesContainer";

const MessagesView = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100">
      <MessageHeader />
      <MessagesContainer />
      <MessageInput />
    </div>
  );
};

export default MessagesView;
