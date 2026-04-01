import { Phone, MessageSquare, UserX, User } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useFriendStore } from "../../../store/useFriendsStore";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const FriendListCard = ({ data }) => {
  const { onlineUsers } = useAuthStore();
  const { unfriendUser } = useFriendStore();
  const queryClient = useQueryClient();
  const isOnline = onlineUsers.includes(data._id);
  const handleUnfriendClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will remove this person from your friends list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Using a red 'error' color for deletion
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, unfriend",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await unfriendUser(data._id);
          queryClient.setQueryData(["myFriends"], (old = []) =>
            old.filter((f) => f._id !== data._id),
          );
          queryClient.invalidateQueries({
            queryKey: ["myFriends", "suggestedFriends"],
          });

          Swal.fire("Unfriended!", "The user has been removed.", "success");
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "Could not complete the request.", "error");
        }
      }
    });
  };

  return (
    <div
      className="group relative flex flex-col sm:flex-row items-start md:items-center justify-between p-4 bg-base-200 border border-base-300 rounded-2xl 
      transition-all duration-300 hover:shadow-md hover:border-primary/30 gap-4"
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative shrink-0">
          <img
            src={data.photoURL || "/avatar.png"}
            alt={data.name}
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-base-200"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-base-100
            ${isOnline ? "bg-success shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-base-300"}`}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-[15px] text-base-content leading-tight truncate">
            {data.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-base-content/40 shrink-0">
              <User size={12} className="text-primary/70" />
              <span className="text-[11px] font-medium">Friend</span>
            </div>

            <div className="w-1 h-1 bg-base-300 rounded-full shrink-0" />

            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0
              ${isOnline ? "text-success bg-success/10" : "text-base-content/30 bg-base-200"}`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-none border-base-100">
        <div className="flex items-center gap-1 bg-base-300 p-1 rounded-xl border border-base-300/30">
          <button
            className="cursor-pointer p-2.5 md:p-2 hover:bg-primary hover:text-primary-content text-primary rounded-lg transition-all active:scale-95"
            title="Message"
          >
            <MessageSquare size={18} />
          </button>
          <button
            className="cursor-pointer p-2.5 md:p-2 hover:bg-primary hover:text-primary-content text-primary rounded-lg transition-all active:scale-95"
            title="Call"
          >
            <Phone size={18} />
          </button>
        </div>
        <button
          onClick={handleUnfriendClick}
          className="cursor-pointer group/unfriend flex items-center justify-center gap-2 sm:gap-0 sm:hover:gap-2 px-4 sm:px-3 py-2.5 sm:py-2 overflow-hidden
            bg-error/10 sm:bg-error/5 hover:bg-error text-error hover:text-error-content rounded-xl transition-all duration-500 ease-in-out flex-1 md:flex-none"
        >
          <UserX size={18} className="shrink-0" />
          <span className="sm:max-w-0 sm:group-hover/unfriend:max-w-20 transition-all duration-500 overflow-hidden text-[12px] font-bold whitespace-nowrap">
            Unfriend
          </span>
        </button>
      </div>
    </div>
  );
};

export default FriendListCard;
