import MessageHeader from "../../components/dashboard/messages/MessageHeader";
import MessagesContainer from "../../components/dashboard/messages/MessagesContainer";
import MessageInput from "../../components/dashboard/messages/MessageInput";

const Messages = () => {
  return (
    <div className="h-[70vh] sm:h-[80vh] overflow-hidden relative flex flex-col bg-base-200 backdrop-blur-sm border border-primary/30 px-4 pb-4 rounded-2xl">
      <MessageHeader />
      <MessagesContainer />
      <MessageInput />
    </div>
  );
};

export default Messages;
