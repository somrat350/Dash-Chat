import { MessageSquare, User, UserPlus } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useFriendStore } from "../../../store/useFriendsStore";
import { useQueryClient } from "@tanstack/react-query";

const SFriendsCard = ({ data }) => {
  const { onlineUsers } = useAuthStore();
  const { sendFriendRequest } = useFriendStore();
  const isOnline = onlineUsers.includes(data._id);
  const queryClient = useQueryClient();
  const sendRequest = async () => {
    await sendFriendRequest(data._id);
    queryClient.setQueryData(["suggestedFriends"], (oldData) => {
      if (!oldData) return [];
      return oldData.filter((user) => user._id !== data._id);
    });
    queryClient.invalidateQueries(["suggestedFriends"]);
  };
  return (
    <div
      className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 p-4 bg-base-200 border border-base-300 rounded-3xl 
      transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] 
      hover:-translate-y-1 overflow-hidden"
    >
      <div
        className={`absolute left-0 top-0 w-1 h-full transition-all duration-500
        ${isOnline ? "bg-success shadow-[2px_0_10px_rgba(34,197,94,0.3)]" : "bg-base-300"}`}
      />

      <div className="flex gap-4 z-10 pl-1">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm ring-4 ring-base-200 transition-all duration-300 group-hover:ring-primary/10 relative">
          <img
            src={data.photoURL || "/avatar.png"}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div
            className={`absolute bottom-0.5 right-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border-2 border-base-100 transition-all duration-300
          ${isOnline ? "bg-success text-success-content" : "bg-base-300 text-base-content/50"}`}
          >
            <div className="flex items-center gap-1">
              <span
                className={`w-1 h-1 rounded-full ${isOnline ? "bg-white animate-pulse" : "bg-gray-500"}`}
              />
              {isOnline ? "Live" : "Off"}
            </div>
          </div>
        </div>

        <div className="flex flex-col mb-3">
          <h3 className="font-bold text-[15px] text-base-content tracking-tight group-hover:text-primary transition-colors duration-300 truncate">
            {data.name}
          </h3>

          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-medium text-base-content/40 flex items-center gap-1.5">
              <User size={12} className="text-primary/60" /> Suggested for you
            </span>
          </div>
        </div>
      </div>

      <div onClick={sendRequest} className="flex items-center gap-2">
        <button className="cursor-pointer flex-1 h-10 px-4 bg-primary text-primary-content hover:shadow-lg hover:shadow-primary/20 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2">
          <UserPlus size={14} strokeWidth={2.5} /> Add Friend
        </button>

        <button className="cursor-pointer h-10 w-10 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-300 flex items-center justify-center active:scale-95 group/msg">
          <MessageSquare
            size={18}
            className="group-hover/msg:scale-110 transition-transform"
          />
        </button>
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
    </div>
  );
};

export default SFriendsCard;
