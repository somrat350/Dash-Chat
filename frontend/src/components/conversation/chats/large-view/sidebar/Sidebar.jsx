import { useState, useEffect } from "react";
import { Plus, MoreVertical, Search } from "lucide-react";
import { useMessageStore } from "../../../../../store/useChatStore";

const Sidebar = () => {
  const [search, setSearch] = useState("");

  const { users, loading, fetchMessagePartners } = useMessageStore();

  useEffect(() => {
    fetchMessagePartners();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const query = search.toLowerCase();
      const aStarts = a.name.toLowerCase().startsWith(query);
      const bStarts = b.name.toLowerCase().startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* header area */}
      <div className="flex items-center justify-between px-4 pt-2">
        <h2 className="font-semibold text-lg">Chats</h2>
        <div className="flex items-center gap-1">
          <button className="hover:bg-primary/30 p-3 rounded-full">
            <Plus size={20} />
          </button>
          <button className="hover:bg-primary/30 p-3 rounded-full">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* search field area*/}
      <div className="px-4 mt-1 mb-2">
        <div className="flex items-center bg-base-200 rounded-full px-3 border border-primary/50">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search or start new chat"
            className="bg-transparent outline-none px-2 py-2 w-full text-sm"
          />
        </div>
      </div>

      {/* user list */}
      <div className="flex-1 overflow-y-auto px-1">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">
            Loading...
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.firebaseUid}
              className="flex items-center px-4 py-3 hover:bg-primary/30 rounded-xl cursor-pointer transition"
            >
              <img
                src={user.photoURL}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3">
                <h3 className="font-medium text-sm">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            User not found
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;