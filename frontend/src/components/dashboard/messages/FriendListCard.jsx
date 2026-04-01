import { Phone, MessageSquare, UserX, User } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useFriendStore } from "../../../store/useFriendsStore";
import toast from "react-hot-toast";

const FriendListCard = ({ friend }) => {
  const { onlineUsers } = useAuthStore();
  const { unfriendUser } = useFriendStore();

  const isOnline = onlineUsers.includes(friend._id);
  const handleUnfriendClick = () => {
    const toastId = toast.custom(
      (t) => (
        <div className={`bg-base-100 border border-base-300 shadow-2xl rounded-2xl p-5 w-[320px] flex flex-col gap-4 transition-all ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}>
          <div className="flex flex-col gap-1">
            <span className="text-base-content font-semibold text-sm">
              Remove Friend?
            </span>
            <span className="text-base-content/60 text-xs">
              Are you sure you want to unfriend <span className="font-bold text-primary">{friend.name}</span>?
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 text-xs font-bold rounded-xl hover:bg-base-200 transition"
              onClick={() => toast.dismiss(toastId)}
            >
              Cancel
            </button>
            <button
              className="bg-error text-error-content px-4 py-2 text-xs font-bold rounded-xl hover:opacity-90 transition"
              onClick={async () => {
                await unfriendUser(friend._id);
                toast.success(`${friend.name} removed`);
                toast.dismiss(toastId);
              }}
            >
              Yes, Unfriend
            </button>
          </div>
        </div>
      ),
      { position: "top-center" }
    );
  };

  

  return (
    <div className="group relative flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-base-100 border border-base-300 rounded-2xl 
      transition-all duration-300 hover:shadow-md hover:border-primary/30 gap-4">
      
    
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative shrink-0">
          <img
            src={friend.photoURL || "/avatar.png"}
            alt={friend.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-base-200"
          />
              <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-base-100
            ${isOnline ? "bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-base-300"}`} 
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-[15px] text-base-content leading-tight truncate">
            {friend.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-base-content/40 shrink-0">
              <User size={12} className="text-primary/70" />
              <span className="text-[11px] font-medium">Friend</span>
            </div>
            
            <div className="w-1 h-1 bg-base-300 rounded-full shrink-0" />

            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0
              ${isOnline ? "text-success bg-success/10" : "text-base-content/30 bg-base-200"}`}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-none border-base-200">        
        <div className="flex items-center gap-1 bg-base-200/50 p-1 rounded-xl border border-base-300/30">
          <button className="p-2.5 md:p-2 hover:bg-primary hover:text-primary-content text-primary rounded-lg transition-all active:scale-95" title="Message">
            <MessageSquare size={18} />
          </button>
          <button className="p-2.5 md:p-2 hover:bg-primary hover:text-primary-content text-primary rounded-lg transition-all active:scale-95" title="Call">
            <Phone size={18} />
          </button>
        </div>
        <button 
          onClick={handleUnfriendClick}
          className="group/unfriend flex items-center justify-center gap-2 md:gap-0 md:hover:gap-2 px-4 md:px-3 py-2.5 md:py-2 overflow-hidden
            bg-error/10 md:bg-error/5 hover:bg-error text-error hover:text-error-content rounded-xl transition-all duration-500 ease-in-out flex-1 md:flex-none"
        >
          <UserX size={18} className="shrink-0" />
          <span className="md:max-w-0 md:group-hover/unfriend:max-w-[80px] transition-all duration-500 overflow-hidden text-[12px] font-bold whitespace-nowrap">
            Unfriend
          </span>
        </button>
      </div>
    </div>
  );
};

export default FriendListCard;