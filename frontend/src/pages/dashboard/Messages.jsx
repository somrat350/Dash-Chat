import { MessagesSquare, Send } from "lucide-react";
import { useParams } from "react-router";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import MessageHeader from "../../components/dashboard/messages/MessageHeader";
import MessagesContainer from "../../components/dashboard/messages/MessagesContainer";
import MessageInput from "../../components/dashboard/messages/MessageInput";

const Messages = () => {
  const { id } = useParams();

  const pageFlow = [
    {
      label: "Chats",
      link: "/dashboard/chats",
      icon: <MessagesSquare size={16} />,
    },
    {
      label: "Messages",
      link: `/dashboard/chats/${id}`,
      icon: <Send size={16} />,
    },
  ];

  return (
    <div className="">
      <Breadcrumb items={pageFlow} />
      <div className="h-[70vh] sm:h-[80vh] overflow-hidden relative flex flex-col bg-base-200 backdrop-blur-sm border border-primary/30 px-4 pb-4 rounded-2xl">
        <MessageHeader />
        <MessagesContainer />
        <MessageInput />
      </div>
    </div>
  );
};

export default Messages;
