import { Search, MoreVertical, Info, Check, BellOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import CallDropdown from "./CallDropdown";
import ProfileDropdown from "./ProfileDropdown";
import SearchDropdown from "./SearchDropdown";
import { useMessageStore } from "../../../../../store/useMessageStore";

export default function ChatHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { selectedPartner } = useMessageStore();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div   className={`sticky top-0 z-50 border-b border-primary/30 transition-all duration-300 ${
    openProfile || search ? "pr-120" : "pr-0"
  }`}
      //  className="sticky top-0 z-50 border-b border-primary/30 transition-all duration-300"
      >
        <div className="flex items-center justify-between px-5 py-3">
          <div
            onClick={() => setOpenProfile(true)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={selectedPartner?.photoURL || "/default-avatar.jpg"}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="font-medium text-gray-800">
                {selectedPartner?.name || "Unknown User"}
              </h2>
              <span className="text-xs text-gray-500">online</span>
            </div>
          </div>

          {/* Right side actions */}
          <div   className="flex items-center gap-4 relative">
            <CallDropdown />

            <SearchDropdown search={search} setSearch={setSearch} />

            <Search
              onClick={() => setSearch(!search)}
              className="cursor-pointer text-gray-700"
              size={20}
            />

            <div ref={menuRef} className="relative"></div>

            {/* More icon */}
            <div ref={menuRef} className="relative">
              <MoreVertical
                className="cursor-pointer text-gray-700"
                size={20}
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {/* Dropdown menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-5 w-48 bg-white border border-primary rounded-lg shadow-lg z-50 overflow-hidden">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setOpenProfile(true); // <-- OPEN PROFILE PANEL
                      setMenuOpen(false); // <-- close dropdown
                    }}
                  >
                    <div className="flex gap-2">
                      <Info /> Contact Info
                    </div>
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    <div className="flex gap-2">
                      <Check /> Select Messages
                    </div>
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    <div className="flex gap-2">
                      <BellOff /> Mute Notification
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Render ProfilePanel if openProfile is true */}

        <ProfileDropdown
         openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          user={selectedPartner}
        />
      </div>
    </>
  );
}
