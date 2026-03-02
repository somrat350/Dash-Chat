import { FiEdit, FiCopy, FiUser } from "react-icons/fi";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfilePage() {
  // const { selectedPartner } = useMessageStore();
  const { authUser } = useAuthStore();

  const [tempName, setTempName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const handleEditName = () => {
    setTempName(authUser?.name || "");
    setEditingName(true);
  };

  const handleSaveName = () => {
    console.log("Saved name:", tempName);
    setEditingName(false);
  };

  const handleCancelName = () => {
    setTempName(authUser?.name || "");
    setEditingName(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-[100] bg-white border-r">
        <div className="flex flex-col items-center p-12 space-y-6">
          <h2 className="text-xl font-semibold ">Profile</h2>
          <img
            src={authUser?.photoURL || "/default-avatar.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          {/* Name */}
          <div className="w-full">
            <div className="text-sm text-gray-500">Name</div>

            {!editingName ? (
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-900 font-medium">
                  {authUser?.name}
                </span>

                <FiEdit
                  className="text-gray-400 hover:text-gray-700 cursor-pointer"
                  onClick={handleEditName}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  className="flex-1 border rounded px-2 py-1"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                />

                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  onClick={handleSaveName}
                >
                  Save
                </button>

                <button
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                  onClick={handleCancelName}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="w-full">
            <div className="text-sm text-gray-500 mt-4">Email</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-900 font-medium">
                {authUser?.email}
              </span>
              <FiCopy className="text-gray-400 hover:text-gray-700 cursor-pointer" />
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <main className="flex-1 flex flex-col justify-center items-center">
        <FiUser className="text-gray-400 text-6xl mb-4" />
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
      </main>
    </div>
  );
}
