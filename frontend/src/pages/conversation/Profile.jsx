import { FiEdit, FiCopy, FiUser } from "react-icons/fi";
import { useMessageStore } from "../../store/useMessageStore";
import { useState } from "react";


export default function ProfilePage() {
  const { selectedPartner } = useMessageStore();


  const [tempName, setTempName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const handleEditName = () => {
    setTempName(selectedPartner?.name || ""); 
    setEditingName(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
  };

  const handleCancelName = () => {
    setEditingName(false);
  };
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-100 bg-white border-r">
        <div className="flex flex-col items-center p-6 space-y-6">
          <img
            src={selectedPartner?.photoURL || "/default-avatar.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />

          {/* Name */}
          <div className="w-full">
            <div className="flex justify-start text-sm text-center text-gray-500">Name</div>

            {!editingName ? (
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-900 font-medium">
                  {selectedPartner?.name}
                </span>
                <FiEdit
                  className="text-gray-400 hover:text-gray-700 cursor-pointer"
                  onClick={handleEditName}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="text"
                  className="flex-1 border rounded px-2 py-1"
                  value={tempName}   // important fix
                  onChange={(e) => setTempName(e.target.value)}
                  autoFocus
                />

                <button
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-green-600"
                  onClick={handleSaveName}
                >
                 save
                </button>

                <button
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-green-600"
                  onClick={handleCancelName}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-start text-sm text-gray-500 mt-4">Email</div>
          <div className="flex justify-start space-x-2">
            <span className="text-gray-900 font-medium">
              {selectedPartner?.email}
            </span>
            <FiCopy className="text-gray-400 hover:text-gray-700 cursor-pointer" />
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



// import { Settings, User, Lock, Bell, LogOut } from "lucide-react";
// import { useMessageStore } from "../../store/useMessageStore";

// export default function Profile() {

//      const { selectedPartner,  } = useMessageStore();
//   return (
//     <div className="h-full flex bg-base-100">
//       {/* Left Sidebar */}
//       <div className="w-[340px] border-r p-5 space-y-4">
//         <h2 className="text-xl font-semibold">Profile</h2>

//         {/* Profile info */}
//         <div className="flex items-center gap-3 p-3 rounded-xl bg-base-200">
//           <img
//             src={selectedPartner?.photoURL || "/default-avatar.jpg"}
//             alt="profile"
//             className="w-14 h-14 rounded-full"
//           />
//           <div>
//             <p className="font-semibold">{selectedPartner?.name}</p>
//             <p className="text-sm opacity-60">View your profile</p>
//           </div>
//         </div>

//         {/* Menu */}
//         <div className="space-y-2 mt-4">
//           <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
//             <User size={20} />
//             Personal Info
//           </button>

//           <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
//             <Lock size={20} />
//             Privacy
//           </button>

//           <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
//             <Bell size={20} />
//             Notifications
//           </button>

//           <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 w-full">
//             <Settings size={20} />
//             Settings
//           </button>

//           <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-500 w-full">
//             <LogOut size={20} />
//             Log out
//           </button>
//         </div>
//       </div>

//       {/* Right Content */}
//       <div className="flex-1 flex items-center justify-center">
//         <div className="text-center opacity-70">
//           <Settings size={40} className="mx-auto mb-3" />
//           <h2 className="text-xl font-semibold">Profile Settings</h2>
//           <p className="text-sm">Select an option from the left menu</p>
//         </div>
//       </div>
//     </div>
//   );
// }