
import React, { useState, useRef, useEffect } from "react";
import { Phone, MessageSquare, MoreVertical, User } from "lucide-react";

const FriendListCard = ({ friend, onSelect }) => {
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
    <div
      className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-base-200 shadow-sm hover:shadow-primary transition cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img
          src={friend.photoURL}
          alt={friend.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <h3 className="font-semibold text-gray-500">{friend.name}</h3>
          <p className="text-sm text-primary font-medium">Friend</p>
          <span
            className={`text-xs ${
              friend.isOnline ? "text-green-500" : "text-gray-400"
            }`}
          >
            {friend.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <div
        className="flex w-full sm:w-auto flex-row gap-2 mt-2 sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="flex-1 sm:flex-none relative overflow-hidden px-4 py-2.5 rounded-2xl btn btn-primary bg-primary group cursor-pointer flex items-center justify-center gap-2">
          <span className="relative z-10 flex items-center gap-2">
            <Phone size={16} /> Call
          </span>
          <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
        </button>
        <button className="flex-1 sm:flex-none relative overflow-hidden border btn btn-primary border-gray-200 flex items-center justify-center gap-2 px-4 py-2.5 bg-white rounded-2xl group cursor-pointer">
          <span className="relative z-10 text-secondary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
            <MessageSquare size={18} /> Chat
          </span>
          <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
        </button>
      </div>

      <div className="absolute top-3 right-3" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-gray-500 cursor-pointer hover:text-gray-700"
        >
          <MoreVertical size={16} />
        </button>

        {dropdownOpen && (
          <div className="absolute right-18 -m-12 w-44 bg-white shadow-xl rounded-xl border border-gray-200 z-50 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(friend); 
                setDropdownOpen(false);
              }}
              className="w-full flex items-center cursor-pointer justify-center gap-1 px-1 py-1 text-gray-700 hover:text-white hover:bg-primary transition-all duration-300 font-medium rounded-xl"
            >
              <User size={16} className="text-primary group-hover:text-white" />
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendListCard;