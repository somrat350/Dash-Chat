import { useQuery } from "@tanstack/react-query";
import { MessagesSquare, Send } from "lucide-react";
import { useParams } from "react-router";
import { useMessageStore } from "../../store/useMessageStore";
import ComponentsLoader from "../../components/ComponentsLoader";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import MessageHeader from "../../components/dashboard/messages/MessageHeader";
import MessagesContainer from "../../components/dashboard/messages/MessagesContainer";

const Messages = () => {
  const { id } = useParams();
  const { getMessagesByUserId } = useMessageStore();
  const { data = {}, isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => getMessagesByUserId(id),
  });

  if (messagesLoading) return <ComponentsLoader />;

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
    <div>
      <Breadcrumb items={pageFlow} />
      <div className="flex-1 flex flex-col bg-base-200 backdrop-blur-sm p-4 rounded-2xl">
        <MessageHeader partner={data.partner} />
        <MessagesContainer messages={data.messages} />
      </div>
    </div>
  );
};

export default Messages;
