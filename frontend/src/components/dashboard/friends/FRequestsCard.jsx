import { Check, X, Users, Clock, UserPlus } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useFriendStore } from "../../../store/useFriendsStore";
import { useQueryClient } from "@tanstack/react-query";

const FRequestsCard = ({ data }) => {
  const { onlineUsers } = useAuthStore();
  const { friendRequestAction } = useFriendStore();
  const queryClient = useQueryClient();
  const isOnline = onlineUsers.includes(data.sender._id);

  const friendsRequestsActions = async (action) => {
    await friendRequestAction(data._id, action);
    queryClient.setQueryData(["friendsRequests"], (oldData = []) => {
      if (!oldData) return [];
      return oldData.filter((item) => item._id !== data._id);
    });
    if (action === "accepted") {
      queryClient.setQueryData(["myFriends"], (old = []) => {
        const alreadyExists = old.find((f) => f._id === data._id);
        if (alreadyExists) return old;
        return [data, ...old];
      });
    }
  };
  return (
    <div className={`relative group transition-all duration-500`}>
      {/* Ambient glow on hover */}
      <div
        className={`absolute -inset-px bg-linear-to-r rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-all duration-500 -z-10`}
      />

      {/* Glass card */}
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 rounded-2xl bg-base-200 border border-primary/10 hover:border-primary/50 backdrop-blur-xl transition-all duration-300">
        <div className="flex gap-4 pb-4 sm:pb-0 border-b sm:border-none border-base-100">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-14 h-14 rounded-full bg-linear-to-br flex items-center justify-center text-primary text-xl shadow-lg ring-1 transition-all duration-300 group-hover:scale-105 overflow-hidden`}
            >
              <img
                src={data.sender.photoURL}
                alt={data.sender.name}
                className="h-full w-full"
              />
            </div>
            {/* Online indicator */}
            {isOnline && (
              <span className="absolute bottom-0 right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-md shadow-emerald-500/40" />
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[15px] leading-snug tracking-tight truncate">
              {data.sender.name}
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              <span className="flex items-center gap-1 text-white/40 text-[11px]">
                <Clock size={10} strokeWidth={2.5} className="shrink-0" />
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => friendsRequestsActions("accepted")}
            className="w-full justify-center sm:w-fit cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-linear-to-br from-emerald-500 to-green-700 text-white text-[13px] font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 hover:from-emerald-400 hover:to-green-500 active:scale-95 transition-all duration-200 select-none"
          >
            <Check size={13} strokeWidth={3} />
            Accept
          </button>
          <button
            onClick={() => friendsRequestsActions("rejected")}
            className="w-full justify-center sm:w-fit cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-linear-to-br from-rose-500 to-red-700 text-white text-[13px] font-semibold shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:scale-105 hover:from-rose-400 hover:to-red-500 active:scale-95 transition-all duration-200 select-none"
            title="Decline"
          >
            <X size={14} strokeWidth={2.5} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default FRequestsCard;
