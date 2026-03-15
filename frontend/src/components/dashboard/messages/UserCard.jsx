import React from "react";
import { Phone, MessageSquare, MoreVertical } from "lucide-react";

const UserCard = ({ friend, activeMenu, setActiveMenu, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(friend)}
      className="relative rounded-2xl p-5 shadow-sm hover:shadow-primary transition bg-base-200"
    >
      <span
        className={`absolute top-3 left-3 text-xs font-semibold ${
          friend.isOnline ? "text-green-500" : "text-gray-400"
        }`}
      >
        {friend.isOnline ? "Online" : "Offline"}
      </span>

      <div className="absolute top-3 right-3 dropdown">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(activeMenu === friend._id ? null : friend._id);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="flex flex-col items-center mt-6">
        <img
          src={friend.photoURL }
          alt={friend.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <h3 className="mt-3 font-semibold text-center text-gray-500">
          {friend.name}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={(e) => e.stopPropagation()}
          className="relative overflow-hidden px-6 py-2.5 rounded-2xl btn btn-primary bg-primary group cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Phone size={16} /> Call
          </span>
          <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
        </button>

        <button
          onClick={(e) => e.stopPropagation()}
          className="relative overflow-hidden border btn btn-primary border-gray-200 flex items-center gap-2 px-2 py-2 bg-white rounded-2xl group cursor-pointer"
        >
          <span className="relative z-10 text-secondary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
            <MessageSquare size={20} /> Chat
          </span>
          <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
        </button>
      </div>
    </div>
  );
};

export default UserCard;