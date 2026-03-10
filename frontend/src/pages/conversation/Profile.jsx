// import { FiEdit, FiCopy, FiUser } from "react-icons/fi";
// import { useState } from "react";
// import { useAuthStore } from "../../store/useAuthStore";

// export default function ProfilePage() {
//   const { authUser } = useAuthStore();

//   const [edit, setEdit] = useState(false);
//   const [editedName, setEditedName] = useState(authUser?.displayName);
//   const [editedEmail, setEditedEmail] = useState(authUser?.email);

//   const handleSave = () => {
//     const updatedData = {
//       name: editedName,
//       email: editedEmail,
//     };
//   };

//   return (
//     <>
//       <div className=" hidden md:grid grid-cols-3 border-l border-primary/30 h-full w-full ">
//         {/* sidebar */}
//         <div className="col-span-1 border-r border-primary/30 ">
//           <aside className="w-[100] bg-white">
//             <div className="flex flex-col p-4 space-y-6">
//               <h2 className="text-xl font-semibold ">Profile</h2>
//               <div className="flex justify-center">
//                 <img
//                   src={authUser?.photoURL || "/default-avatar.jpg"}
//                   alt="Profile"
//                   className="w-24 h-24 rounded-full object-cover"
//                 />
//               </div>
//               <div className="flex flex-col gap-6">
//                 <div className="flex flex-col gap-2">
//                   <p className="font-bold text-gray-700 text-lg">Email : </p>
//                   <p>{authUser?.email}</p>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <p className="font-bold text-gray-700 text-lg">Name : </p>
//                   {edit ? (
//                     <input
//                       type="text"
//                       required
//                       onChange={(e) => setEditedName(e.target.value)}
//                       defaultValue={authUser.displayName}
//                       className="input w-full"
//                     />
//                   ) : (
//                     <p>{authUser?.displayName}</p>
//                   )}
//                 </div>
//                 {edit && (
//                   <div className="flex flex-col gap-2">
//                     <p className="font-bold text-gray-700 text-lg">Photo : </p>
//                     <input
//                       type="file"
//                       // onChange={(e) => setEditedName(e.target.value)}
//                       className="file-input w-full"
//                     />
//                   </div>
//                 )}

//                 <div className="flex justify-end gap-2">
//                   {edit || (
//                     <button
//                       onClick={() => setEdit(true)}
//                       className="btn btn-secondary"
//                     >
//                       Edit Profile
//                     </button>
//                   )}
//                   {edit && (
//                     <button
//                       onClick={() => setEdit(false)}
//                       className="btn btn-secondary"
//                     >
//                       Cancel Changes
//                     </button>
//                   )}
//                   {edit && (
//                     <button
//                       onClick={() => setEdit(false)}
//                       className="btn btn-primary"
//                     >
//                       Save Changes
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         {/* Right portion */}
//         <div className="col-span-2 flex flex-col h-screen relative">
//           <main className="flex-1 flex flex-col justify-center items-center">
//             <FiUser className="text-gray-400 text-6xl mb-4" />
//             <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
//           </main>
//         </div>
//       </div>
//   </>
//   );
// }
