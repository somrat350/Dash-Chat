import {
  Search,
  Video,
  Phone,
  MoreVertical,
  Info,
  Check,
  BellOff,
  CircleX,
  ArrowLeft,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

import ProfileDropdown from "./ProfileDropdown";
import SearchDropdown from "./SearchDropdown";
import { useMessageStore } from "../../../../../store/useMessageStore";

export default function ChatHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const { selectedPartner, setSelectedPartner } = useMessageStore();
  // const { selectedPartner} = useMessageStore();
  const menuRef = useRef(null);

  // Name if too long, trim it and add ... at the end. and show will show only first 16 words of the name
  const partnerName = selectedPartner?.name?.trim() || "Unknown User";
  const nameWords = partnerName.split(/\s+/).filter(Boolean);
  const displayPartnerName =
    nameWords.length > 16 ? `${nameWords[0]}..` : partnerName;

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
        className={`sticky top-0 z-50 border-b border-primary/30 transition-all duration-300 ${
          openProfile || search ? "pr-120" : "pr-0"
        }`}
      >
        <div className="flex items-center justify-between lg:justify-start px-5 py-3">
          {/* back arrow for small device  */}
          <div>
            <button
              onClick={() => setSelectedPartner(null)}
              className="md:hidden hover:bg-primary/20 rounded-full p-1"
              aria-label="Back to chat list"
            >
              <ArrowLeft />
            </button>
          </div>
          {/* Name and Profile img  */}
          <div
            onClick={() => setOpenProfile(true)}
            className="flex items-center gap-3 cursor-pointer mr-5"
          >
            <img
              src={selectedPartner?.photoURL || "/default-avatar.jpg"}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <h2 className="font-medium text-gray-800 text-sm md:text-base lg:text-lg">
                {displayPartnerName}
              </h2>
              {/* Online Active Status  */}
              <span className="text-xs text-gray-500">Online</span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 md:gap-4 lg:gap-5 relative lg:ml-auto">
            {/* Video and Audio call icons  */}
            <Video className="cursor-pointer text-gray-700" size={20} />
            <Phone className="cursor-pointer text-gray-700" size={17} />

            <div className="hidden sm:block">
              <SearchDropdown search={search} setSearch={setSearch} />
            </div>

            <Search
              onClick={() => setSearch(!search)}
              className="hidden sm:block cursor-pointer text-gray-700"
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
                      setOpenProfile(true);
                      setMenuOpen(false);
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
                  <button
                    onClick={() => {
                      setSelectedPartner(null);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <div className="flex gap-2">
                      <CircleX /> Close chat
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
