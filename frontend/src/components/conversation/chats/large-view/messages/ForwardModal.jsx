import { useState } from "react";
import { useMessageStore } from "../../../../../store/useMessageStore";

const ForwardModal = ({ message, onClose }) => {
  const { messagePartners, forwardMessage } = useMessageStore();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers = messagePartners.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleUser = (email) => {
    setSelectedUsers(prev =>
      prev.includes(email)
        ? prev.filter(u => u !== email)
        : [...prev, email]
    );
  };

  const handleForward = () => {
    selectedUsers.forEach(email => forwardMessage(message, email));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-base-100 w-[420px] rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Forward Message</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="bg-base-200 p-3 rounded mb-3 text-sm">{message.text}</div>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded mb-3 outline-none"
        />

        <div className="max-h-[300px] overflow-y-auto">
          {filteredUsers.map(user => (
            <div
              key={user.firebaseUid}
              onClick={() => toggleUser(user.email)}
              className="flex items-center justify-between px-4 py-3 hover:bg-primary/30 rounded-xl cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <img src={user.photoURL || "/default-avatar.jpg"} className="w-12 h-12 rounded-full"/>
                <div>
                  <h3 className="font-medium text-sm">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <input type="checkbox" checked={selectedUsers.includes(user.email)} readOnly />
            </div>
          ))}
        </div>

        <button
          onClick={handleForward}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/80"
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default ForwardModal;