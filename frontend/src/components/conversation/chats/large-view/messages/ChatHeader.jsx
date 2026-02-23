import { Search, MoreVertical, Info, Check, BellOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import CallDropdown from "./CallDropdown";
import ProfileDropdown from "./ProfileDropdown";
import SearchDropdown from "./SearchDropdown";

export default function ChatHeader() {
  // const [openCall, setOpenCall] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

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
      <div
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          openProfile || search ? "mr-100" : "bg-[#f0f2f5]"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-3">
            <img
              onClick={() => setOpenProfile(true)}
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <h2 className="font-medium text-gray-800">Osama bin Somrat Vai</h2>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4 relative">
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
                <div className="absolute right-0 mt-5 w-48 bg-white border rounded-lg shadow-lg z-50">
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
        />
      </div>
    </>
  );
}
