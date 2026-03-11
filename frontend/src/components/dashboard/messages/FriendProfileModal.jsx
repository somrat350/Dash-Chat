import { UserPlus, CheckCircle, X, Mail, User, Circle } from "lucide-react";

const FriendProfileModal = ({ friend, onClose }) => {
  if (!friend) return null;

  const isFriend = friend.isFriend;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

      <div className="bg-base-100 w-[380px] rounded-3xl p-8 relative shadow-2xl border border-base-300">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-base-content/60 hover:text-base-content transition"
        >
          <X size={22} />
        </button>
        
        <div className="flex items-center gap-5">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-24 h-24 rounded-full border-4 border-primary object-cover shadow-md"
          />

          <div className="space-y-2">

            {/* user info*/}
            <div className="flex items-center gap-2 text-base-content">
              <User size={18} className="text-primary" />
              <span className="font-semibold text-lg">
                {friend.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-base-content/70 text-sm">
              <Mail size={16} />
              <span>
                {friend.name.toLowerCase().replace(" ", "")}@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Circle
                size={10}
                className={friend.isOnline ? "text-green-500" : "text-gray-400"}
                fill="currentColor"
              />
              <span
                className={
                  friend.isOnline
                    ? "text-green-500 font-medium"
                    : "text-base-content/50"
                }
              >
                {friend.isOnline ? "Online" : "Offline"}
              </span>
            </div>

          </div>
        </div>

        {/* button */}
        <div className="mt-8">

          {isFriend ? (
            <button className="flex items-center justify-center gap-2 bg-success text-white px-4 py-3 rounded-xl w-full cursor-default">
              <CheckCircle size={18} />
              Friends
            </button>
          ) : (
            <button className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-3 rounded-xl w-full transition">
              <UserPlus size={18} />
              Add Friend
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default FriendProfileModal;