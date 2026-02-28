import { useEffect, useRef } from "react";

export default function SearchDropdown({ search, setSearch }) {
  const dropdownRef = useRef(null);

  // Outside click detect
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearch(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSearch]);

  if (!search) return null;

  return (
    <div
    
      ref={dropdownRef}
      

      className="fixed right-0 top-0 w-80 bg-white border-l border-primary h-screen p-4 z-50 shadow-lg"
    >
      {/* Close button */}
      <button
        onClick={() => setSearch(false)}
        className="absolute right-4 top-4 text-gray-500 text-lg"
      >
        Search messages ✕
      </button>

      {/* Profile */}
      <div className=" mt-10 w-full max-w-md mx-auto my-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
        />
      </div>
    </div>
  );
}
