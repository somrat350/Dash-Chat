import { Link } from "react-router";
import { LucidePhone, MessagesSquare } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const ChatCard = ({ partner }) => {
  const { authUser, onlineUsers } = useAuthStore();
  const isFriend = () => {
    const isExist = partner.friends.some((friend) => friend === authUser._id);
    return isExist ? "Friend" : "Not Friend";
  };
  const isOnline = () => onlineUsers.some((userId) => userId === partner._id);
  return (
    <>
      <div className="card bg-base-200 shadow-xl border border-white/5 hover:border-primary transition-all duration-300">
        <div className="card-body p-5">
          <div className="flex items-center gap-4">
            <div className="avatar relative">
              <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={partner.photoURL || "/default-avatar.jpg"}
                  alt="User"
                />
              </div>
              <span
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${isOnline() ? "bg-success" : "bg-gray-500"}`}
              ></span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="card-title text-sm font-bold truncate">
                  {partner.name}
                </h2>
                <div className="badge badge-primary badge-outline badge-xs">
                  {isFriend()}
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">
                Last: Hey, how are you doing?
              </p>
              <span className="text-[10px] opacity-50">
                Last seen: 2 mins ago
              </span>
            </div>
          </div>

          <div className="card-actions pt-4 border-t border-white/5 gap-2 mt-6">
            <Link
              to={`/dashboard/chats/${partner._id}`}
              className="btn btn-primary flex-1 btn-circle btn-sm md:btn-md gap-2"
            >
              <MessagesSquare size={18} />
              Messages
            </Link>

            <Link
              to={`/dashboard/calls/${partner._id}`}
              className="btn btn-outline btn-primary btn-circle btn-sm md:btn-md"
            >
              <LucidePhone size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
