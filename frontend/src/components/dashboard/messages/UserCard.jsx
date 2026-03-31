
import React, { useState, useEffect, useRef } from "react";
import { Phone, MessageSquare, MoreVertical, User } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";

const UserCard = ({ friend, onSelect }) => {
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.find((user) => user === friend._id);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative rounded-2xl p-5 shadow-sm hover:shadow-primary transition bg-base-200">
   
      <span
        className={`absolute top-3 left-3 text-xs font-semibold ${
          isOnline ? "text-green-500" : "text-gray-400"
        }`}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
      <div className="absolute top-3 right-3" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-gray-500 cursor-pointer hover:text-gray-700"
        >
          <MoreVertical size={18} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-xl border border-gray-200 z-50 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(friend); 
                setDropdownOpen(false);
              }}
              className="w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-3 text-gray-700 hover:text-white hover:bg-primary transition-all duration-300 font-medium rounded-xl"
            >
              <User size={16} className="text-primary group-hover:text-white" />
              Details
            </button>
          </div>
        )}
      </div>

     
      <div className="flex flex-col items-center mt-6">
        <img
          src={friend.photoURL}
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