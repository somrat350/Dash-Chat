import { MessagesSquare } from "lucide-react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import ChatCard from "../../components/dashboard/ChatCard";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../lib/axios";
import ComponentsLoader from "../../components/ComponentsLoader";
const pageFlow = [
  {
    label: "Chats",
    link: "/dashboard/chats",
    icon: <MessagesSquare size={16} />,
  },
];

const Chats = () => {
  const { data: chatPartners = [], isLoading: chatPartnersLoading } = useQuery({
    queryKey: ["chatPartners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/messages/messagePartners`);
      return res.data;
    },
  });

  if (chatPartnersLoading) return <ComponentsLoader />;
  console.log(chatPartners);

  return (
    <div>
      <Breadcrumb items={pageFlow} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chatPartners.map((_, i) => (
          <ChatCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Chats;
