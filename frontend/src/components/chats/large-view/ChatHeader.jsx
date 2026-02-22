import { Phone, ChevronDown, Search, MoreVertical } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="sticky top-0 z-50 bg-[#f0f2f5] border-b">
      <div className="flex items-center justify-between px-5 py-3">

        {/* Left side (Profile + Name) */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-medium text-gray-800">
            Name
          </h2>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          
          {/* Call button */}
          <button className="flex items-center gap-2 px-4 py-1.5 border rounded-full bg-white hover:bg-gray-100">
            <Phone size={18} />
            <span>Call</span>
            <ChevronDown size={16} />
          </button>

          {/* Icons */}
          <Search className="cursor-pointer text-gray-700" size={20} />
          <MoreVertical className="cursor-pointer text-gray-700" size={20} />
        </div>

      </div>
    </div>
  );
}