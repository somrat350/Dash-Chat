import { useState } from "react";
import { Plus, MoreVertical, Search } from "lucide-react";

const users = [
  {
    _id: 1,
    name: "Osambin Somrat",
    message: "Video",
    time: "04:30",
    img: "https://i.ibb.co.com/dsHnTmsC/Screenshot-2026-02-17-013037.png",
    active: true,
  },
  {
    _id: 2,
    name: "Lima Akter",
    message: "Voice call",
    time: "11:23",
    img: "https://i.ibb.co.com/7xrDDXJX/Screenshot-2026-02-17-082808.png",
    active: false,
  },
  {
    _id: 3,
    name: "Sabbir Shohag",
    message: "What are you doing now?",
    time: "13:12",
    img: "https://i.ibb.co.com/chhzMXs5/Screenshot-2026-02-17-013133.png",
    active: true,
  },
  {
    _id: 4,
    name: "Chaina Akter",
    message: "hi! how are you?",
    time: "12:00",
    img: "https://i.ibb.co.com/605KJFRY/Screenshot-2026-02-17-082859.png",
    active: false,
  },
  {
    _id: 5,
    name: "Arman Islam",
    message: "Hello",
    time: "2:10",
    img: "https://i.ibb.co.com/twKrxgRV/Screenshot-2026-02-17-013213.png",
    active: false,
  },
  {
    _id: 6,
    name: "Tangila Khatun",
    message: "You:Jani na",
    time: "1:00",
    img: "https://i.ibb.co.com/XrgWsXH1/f0800412-b9ed-4fdc-8558-45c5d480968f.jpg",
    active: false,
  },
];

const Sidebar = () => {
  const [search, setSearch] = useState("");

  //  Filter logic
  const filteredUsers = users
    .filter((user) => {
      const name = user.name.toLowerCase().trim();
      const query = search.toLowerCase().trim();
      return name.includes(query);
    })
    .sort((userA, userB) => {
      const query = search.toLowerCase().trim();
      const aStarts = userA.name.toLowerCase().startsWith(query);
      const bStarts = userB.name.toLowerCase().startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* header area  */}
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">Chats</h2>
        </div>

        <div className="flex items-center gap-1">
          <button className="hover:bg-primary/30 cursor-pointer duration-200 p-3 rounded-full">
            <Plus size={20} />
          </button>
          <button className="hover:bg-primary/30 cursor-pointer duration-200 p-3 rounded-full">
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

      {/* user list  */}
      <div className="flex-1 overflow-y-auto px-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 hover:bg-primary/30 rounded-xl cursor-pointer transition"
            >
              <div className="flex items-center gap-3 relative">
                <div className="relative">
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {user.active && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.message}</p>
                </div>
              </div>

              <span className="text-xs text-gray-400">{user.time}</span>
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
