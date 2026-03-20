import { useState, useEffect } from "react";
import FriendProfileModal from "../../components/dashboard/messages/FriendProfileModal";
import { useFriendStore } from "../../store/useFriendsStore";
import Pagination from "../../components/Pagination";
import UserCard from "../../components/dashboard/messages/userCard";
import FriendListCard from "../../components/dashboard/messages/FriendListCard";


const Friends = () => {
  const { friends,suggestions, getFriendSuggestions,getMyFriends } = useFriendStore();
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
  const loadData = async () => {
    await getMyFriends();          
    await getFriendSuggestions();  
  };

  loadData();

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown")) setActiveMenu(null);
  };

  document.addEventListener("click", handleClickOutside);

  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  const yourFriends = friends;

  const totalPages = Math.ceil(suggestions.length / itemsPerPage);
  const currentSuggestions = suggestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 p-6">
      <h2 className="text-lg font-semibold mb-4">Your Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4  gap-6">
         {yourFriends.length > 0
          ? yourFriends.map((f) => (
              <FriendListCard
                key={f._id}
                friend={f}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                onSelect={setSelectedFriend}
              />
            ))
          : <p className="text-sm text-gray-500">No friends yet</p>} 
          
      </div>

      <h2 className="text-lg font-semibold mt-10 mb-4">Suggested Friends</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {currentSuggestions.length > 0
          ? currentSuggestions.map((f) => (
              <UserCard
                key={f._id}
                friend={f}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                onSelect={setSelectedFriend}
              />
            ))
          : <p className="text-sm text-gray-500">No suggestions</p>}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedFriend && (
        <FriendProfileModal
          friend={{
            ...selectedFriend,
            avatar: selectedFriend.photoURL,
          }}
          onClose={() => setSelectedFriend(null)}
        />
      )}
    </div>
  );
};

export default Friends;