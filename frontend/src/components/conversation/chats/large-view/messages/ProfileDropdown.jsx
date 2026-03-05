import { useEffect, useRef } from "react";
import { useMessageStore } from "../../../../../store/useMessageStore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronDown, Phone, PhoneCall, Search, Video } from "lucide-react";

dayjs.extend(relativeTime);

export default function ProfileDropdown({ openProfile, setOpenProfile }) {
  const dropdownRef = useRef(null);
  const { selectedPartner } = useMessageStore();

  // Outside click detect
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpenProfile]);

  if (!openProfile || !selectedPartner) return null;

  return (
    <div
      className="fixed right-0 top-0 w-80 bg-white border-l border-primary h-screen p-4 z-50 shadow-lg"
      ref={dropdownRef}
    >
      {/* Close button */}
      <button
        onClick={() => setOpenProfile(false)}
        className="absolute right-4 top-4 text-gray-500 text-lg"
      >
        Contac info ✕
      </button>

      {/* Profile */}
      <div className="flex flex-col items-center mt-20">
        <img
          src={selectedPartner.photoURL}
          alt={selectedPartner.name}
          className="w-24 h-24 rounded-full mb-3"
        />
        <h2 className="text-lg font-semibold">{selectedPartner.name}</h2>
        <p>contac no</p>
      
        <div className="mt-10 w-full flex  gap-4">
          {/* Search */}
          <div className="flex flex-col justify-center items-center gap-3 border rounded-2xl p-4 hover:bg-gray-50 cursor-pointer">
            <Search className="text-green-600" size={22} />
            <span className="text-gray-700 font-medium">Search</span>
          </div>

          {/* Video Call */}
          <div className="flex flex-col justify-center items-center gap-3 border rounded-2xl p-4 hover:bg-gray-50 cursor-pointer">
            <Video className="text-green-600" size={22} />
            <span className="text-gray-700 font-medium">Video</span>
          </div>

          {/* Voice Call */}
          <div className="flex flex-col justify-center items-center gap-3 border rounded-2xl p-4 hover:bg-gray-50 cursor-pointer">
            <PhoneCall className="text-green-600" size={22} />
            <span className="text-gray-700 font-medium">Voice</span>
          </div>
        </div>
      </div>
        {/* Contact info */}
        <div className="mt-6 space-y-3">
          <div>
            <p className="text-gray-400 text-sm">About</p>
            <p className="font-medium">
              {selectedPartner.about || "Hey there! I am using Dash-chat."}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-medium">{selectedPartner.email}</p>
          </div>
        </div>
    </div>
  );
}
