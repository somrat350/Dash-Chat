import { useState, useRef, useEffect } from "react";
import { Phone, Video, ChevronDown, Link, Calendar } from "lucide-react";

export default function CallDropdown() {
  const [openCall, setOpenCall] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click detect
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCall(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Call Button */}
      <button
        onClick={() => setOpenCall(!openCall)}
        className="flex items-center gap-2 px-4 py-2 border border-primary/50 rounded-full hover:border-primary duration-200 text-gray-700 cursor-pointer"
      >
        <Phone size={18} />
        Call
        <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {openCall && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-2xl border border-primary p-4 z-50">
          <div className="flex flex-col items-center mt-10 mb-2">
            <img
              src="https://i.pravatar.cc/150"
              className="w-24 h-24 rounded-full mb-3"
            />
            <h2 className="text-lg font-semibold">Osama bin Somrat Vai</h2>
          </div>
          <div className="flex gap-3 mb-4">
            <button className="flex-1 bg-green-500 text-white py-2 rounded-full flex items-center justify-center gap-2">
              <Phone size={16} />
              Voice
            </button>

            <button className="flex-1 bg-green-500 text-white py-2 rounded-full flex items-center justify-center gap-2">
              <Video size={16} />
              Video
            </button>
          </div>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <Link size={16} />
              Send call link
            </div>

            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
              <Calendar size={16} />
              Schedule call
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
