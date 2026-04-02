import { UserPlus, CheckCircle, X, Mail, User, Circle, UserMinus } from "lucide-react";
import { useFriendStore } from "../../../store/useFriendsStore"; 
import toast from "react-hot-toast";

const FriendProfileModal = ({ friend, onClose }) => {
  const { sendFriendRequest,unfriendUser } = useFriendStore();
  
  if (!friend) return null;

  const isFriend = friend.isFriend;

  const handleAddFriend = async () => {
    await sendFriendRequest(friend._id);
    onClose();
  };

  const handleUnfriend = () => {
  const id = toast.custom(
    (t) => (
      <div
        className={`bg-white border border-gray-200 shadow-lg rounded-xl p-5 w-[300px] flex flex-col gap-4 transition-all ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        
        <span className="text-gray-800 font-medium text-sm">
          Are you sure you want to unfriend <span className="font-semibold">{friend.name}</span>?
        </span>
        <div className="flex justify-end gap-3">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition cursor-pointer "
            onClick={async () => {
              await unfriendUser(friend._id);
              toast.success("Removed from friends");
              toast.dismiss(id);
              onClose();
            }}
          >
            Yes
          </button>
           <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded-lg transition cursor-pointer"
            onClick={() => {
              toast.dismiss(id); 
              onClose();         
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { position: "top-center" } 
  );
};

  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 overflow-y-auto bg-black/50 backdrop-blur-sm z-50">

      <div className="bg-base-100 w-[380px] max-w-full rounded-3xl p-4 sm:p-6 md:p-8 relative shadow-2xl border border-base-300">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-base-content/60 hover:text-base-content transition cursor-pointer"
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
            {/* user info */}
            <div className="flex items-center gap-2 text-base-content">
              <User size={18} className="text-primary" />
              <span className="font-semibold text-lg">{friend.name}</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/70 text-sm">
              <Mail size={16} />
              <span>{friend.name.toLowerCase().replace(" ", "")}@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Circle
                size={10}
                className={friend.isOnline ? "text-green-500" : "text-gray-400"}
                fill="currentColor"
              />
              <span className={friend.isOnline ? "text-green-500 font-medium" : "text-base-content/50"}>
                {friend.isOnline ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </div>

        {/* button */}
        <div className="mt-8">
          {isFriend ? (
                 <button
             onClick={handleUnfriend}
             className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-3 rounded-xl w-full transition cursor-pointer"
           >
             <UserMinus size={16} />
             Unfriend
           </button>
          ) : (
            <button
              onClick={handleAddFriend}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-3 rounded-xl w-full transition cursor-pointer"
            >
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