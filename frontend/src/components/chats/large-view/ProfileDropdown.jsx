import { useEffect, useRef } from "react";

export default function ProfileDropdown({ openProfile, setOpenProfile }) {
  const dropdownRef = useRef(null);

  // Outside click detect
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenProfile]);

  if (!openProfile) return null;

  return (
    <div
      ref={dropdownRef}
      className="fixed right-0 top-0 w-80 bg-white border-l h-screen p-4 z-50 shadow-lg"
    >
      {/* Close button */}
      <button
        onClick={() => setOpenProfile(false)}
        className="absolute right-4 top-4 text-gray-500 text-lg"
      >
         ✕
       
      </button>

      {/* Profile */}
      <div className="flex flex-col items-center mt-10">
        <img
          src="https://i.pravatar.cc/150"
          className="w-24 h-24 rounded-full mb-3"
        />
        <h2 className="text-lg font-semibold">
          Osama bin Somrat Vai
        </h2>
        <p className="text-sm text-gray-500">
          Last seen today at 10:30 AM
        </p>
      </div>

      {/* Contact info */}
      <div className="mt-6 space-y-3">
        <div>
          <p className="text-gray-400 text-sm">Phone</p>
          <p className="font-medium">+8801XXXXXXXXX</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">About</p>
          <p className="font-medium">
            Hey there! I am using Dash-chat.
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="font-medium">example@gmail.com</p>
        </div>
      </div>
    </div>
  );
}