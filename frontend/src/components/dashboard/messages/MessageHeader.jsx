import { X } from "lucide-react";
import { Link, useParams } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMessageStore } from "../../../store/useMessageStore";
import { useQuery } from "@tanstack/react-query";

const MessageHeader = () => {
  const { id } = useParams();
  const { getUserById } = useMessageStore();
  const { data: partner = {}, isLoading } = useQuery({
    queryKey: ["partner", id],
    queryFn: async () => getUserById(id),
  });
  const { onlineUsers } = useAuthStore();
  if (isLoading) return <p>User loading...</p>;
  const isOnline = onlineUsers.includes(partner._id);
  return (
    <div
      className="flex justify-between items-center border-b
   border-primary/30 pb-3 pt-4 sticky top-0 z-30 bg-base-200"
    >
      <div className="flex items-center space-x-3">
        <div className="avatar relative">
          <div className="w-12 rounded-full">
            <img
              src={partner.photoURL || "/default-avatar.jpg"}
              alt={partner.name}
            />
          </div>
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${isOnline ? "bg-success" : "bg-gray-500"}`}
          ></span>
        </div>

        <div>
          <h3 className="font-medium">{partner.name}</h3>
          <p className="text-sm">typing...</p>
        </div>
      </div>

      <Link to="/dashboard/chats">
        <X
          size={28}
          className="text-primary transition-colors cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default MessageHeader;
