import { useState, useEffect } from "react";
import { Phone, MessageSquare, MoreVertical, UserPlus, Edit2, Trash2 } from "lucide-react";
import FriendProfileModal from "../../components/dashboard/messages/FriendProfileModal";

const Friends = () => {

   const initialFriend = [
    { name: "Arman Islam", isOnline: true, avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" },
    { name: "Osamabin Somrat", isOnline: false, avatar: "https://i.ibb.co.com/JFCXxgD6/Annotation-2026-02-17-152124.png" },
    { name: "Sabbir Hossain", isOnline: true, avatar: "https://i.ibb.co.com/DHkWSP4k/Annotation-2026-02-17-134327.png" },
    { name: "Lima Akther", isOnline: false, avatar: "https://i.ibb.co.com/zWzn0xZY/lima.jpg" },
    { name: "Tangila Khatun", isOnline: true, avatar: "https://i.ibb.co.com/fGCLJsPw/images-tangida.jpg" },
    { name: "China Akther", isOnline: true, avatar: "https://i.ibb.co.com/XrP39Qhv/images-c.jpg" },
    { name: "Sakib Hossain", isOnline: true, avatar: "https://i.ibb.co.com/tMTKSKYw/sakib.jpg" },
    { name: "Rakib Ahamed", isOnline: true, avatar: "https://i.ibb.co.com/9HJsM6YW/rakib.jpg" },
    { name: "Nlaoy khan", isOnline: true, avatar: "https://i.ibb.co.com/BVLf3YZP/nalyo.jpg" },
  ];

   const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem("friends");
    return saved ? JSON.parse(saved) : initialFriend;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(friends.length / itemsPerPage);
  const currentFriends = friends.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFriendIndex, setEditingFriendIndex] = useState(null);
  const [friendName, setFriendName] = useState("");
  const [friendAvatar, setFriendAvatar] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const openAddModal = () => {
    setEditingFriendIndex(null);
    setFriendName("");
    setFriendAvatar(null);
    setShowModal(true);
  };

  const openEditModal = (index) => {
    setEditingFriendIndex(index);
    setFriendName(friends[index].name);
    setFriendAvatar(null);
    setShowModal(true);
  };

  const handleSaveFriend = () => {
    if (!friendName.trim()) return;
    let updated = [...friends];
    if (editingFriendIndex !== null) {
      updated[editingFriendIndex] = {
        ...updated[editingFriendIndex],
        name: friendName,
        avatar: friendAvatar ? URL.createObjectURL(friendAvatar) : updated[editingFriendIndex].avatar,
      };
    } else {
      const newFriend = {
        name: friendName,
        isOnline: true,
        avatar: friendAvatar ? URL.createObjectURL(friendAvatar) : `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)}`,
      };
      updated = [newFriend, ...updated];
    }
    setFriends(updated);
    localStorage.setItem("friends", JSON.stringify(updated));
    setShowModal(false);
    setFriendName("");
    setFriendAvatar(null);
  };

  const handleDeleteFriend = (index) => {
    const updated = friends.filter((_, i) => i !== index);
    setFriends(updated);
    localStorage.setItem("friends", JSON.stringify(updated));
  };

  return (
     <div className="flex-1 p-6 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Friends</h1>
          <p className="text-sm text-gray-500">Manage your friends</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 btn btn-primary bg-primary hover:bg-secondary  px-4 py-2 rounded-lg text-sm shadow">
          <UserPlus size={18} /> Add Friend
        </button>
      </div>
           {/** friend card */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

        {currentFriends.map((friend, index) => (
          <div
            key={index}
             onClick={() => setSelectedFriend(friend)}
            className="relative rounded-2xl p-5  shadow-sm hover:shadow-primary transition bg-base-200 r"
          >
            <span
              className={`absolute top-3 left-3 text-xs font-semibold ${
                friend.isOnline ? "text-green-500" : "text-gray-400"
              }`}
            >
              {friend.isOnline ? "Online" : "Offline"}
            </span>

            <div className="absolute top-3 right-3 dropdown">
              <button
                onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical size={18} />
              </button>

              {activeMenu === index && (
                <div className="absolute right-0 top-6 w-18  rounded-lg shadow-md text-sm bg-gray-100 z-10">
                  <button
                    onClick={() => openEditModal(index)}
                    className="w-full px-3 py-1.5 hover:bg-gray-200 flex items-center gap-2 text-gray-900"
                  >
                    <Edit2 size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDeleteFriend(index)}
                    className="w-full px-3 py-1.5 hover:bg-red-200 text-red-500 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
                {/* profile */}
            <div className="flex flex-col items-center mt-6">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <h3 className="mt-3 font-semibold text-center text-gray-500">
                {friend.name}
              </h3>
            </div>
                 {/* button  */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button  onClick={(e) => e.stopPropagation()} className="relative overflow-hidden px-6 py-2.5 rounded-2xl btn btn-primary  bg-primary group cursor-pointer">
               
                <span className="relative z-10 flex items-center gap-2">
                  <Phone size={16} /> Call
                </span>
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>

              <button  onClick={(e) => e.stopPropagation()} className="relative overflow-hidden border btn btn-primary border-gray-200 flex items-center gap-2 px-2 py-2 bg-white rounded-2xl group cursor-pointer">
                <span className="relative z-10 text-secondary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <MessageSquare size={20} /> Chat
                </span>
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* friend modal  */}
       {selectedFriend && (
  <FriendProfileModal
    friend={selectedFriend}
    onClose={() => setSelectedFriend(null)}
  />
)}

       {/* Page couunt */}
      {totalPages > 1 && (
        <div className="flex justify-center  mt-8">
          <div className="flex items-center gap-2 bg-white border border-gray-300 shadow-sm hover:shadow-primary  rounded-full  p-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 rounded-full border border-transparent   hover:bg-gray-100 disabled:opacity-40 text-gray-700 transition"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full border border-transparent transition ${
                  currentPage === i + 1
                    ? "bg-primary text-white shadow-lg"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 rounded-full border border-transparent hover:bg-gray-100 disabled:opacity-40 text-gray-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      )}


     {/* friend  add modal*/}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-gray-900">
            <h2 className="text-lg font-bold mb-4">{editingFriendIndex !== null ? "Edit Friend" : "Add Friend"}</h2>

            <input
              type="text"
              placeholder="Friend Name"
              value={friendName}
              onChange={e => setFriendName(e.target.value)}
              className="w-full border px-3 py-2 rounded-2xl mb-3  bg-white text-gray-900 placeholder-gray-400"
            />

            <input
              type="file"
              accept="image/*"
              onChange={e => setFriendAvatar(e.target.files[0])}
              className="w-full border px-3 py-2 rounded-2xl mb-3 bg-white text-gray-900 placeholder-gray-400"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-900">Cancel</button>
              <button onClick={handleSaveFriend} className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;