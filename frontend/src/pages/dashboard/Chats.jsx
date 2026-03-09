import { MessagesSquare } from "lucide-react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";
import ChatCard from "../../components/dashboard/ChatCard";

const pageFlow = [
  {
    label: "Chats",
    link: "/dashboard/chats",
    icon: <MessagesSquare size={16} />,
  },
];

const Chats = () => {
  return (
    <div>
      <Breadcrumb items={pageFlow} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...new Array(10)].map((_, i) => (
          <ChatCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Chats;
