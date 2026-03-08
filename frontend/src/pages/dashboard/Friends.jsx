import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MoreVertical, ChevronLeft, ChevronRight, UserPlus, X, UserMinus, Globe, Moon, Camera } from 'lucide-react';

const Friends = () => {

  // friend list 
  const defaultFriends = [
    { 
    id: 1, 
    name: "Arman Islam Shuvo", 
    isOnline: true, 
   
    avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" 
  },
  { 
    id: 2, 
    name: "Osamabin Somrat", 
    isOnline: false, 
    avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" 
  },
  { 
    id: 3, 
    name: "Sabbir Hossain", 
    isOnline: true, 
    avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" 
  },
  { 
    id: 4, 
    name: "Lima Akther", 
    isOnline: false, 
    avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" 
  },
  { 
    id: 5, 
    name: "Tangila Khatun", 
    isOnline: true, 
    avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" 
  },
  { 
    id: 6, 
    name: "China Akther", 
    isOnline: true, 
    avatar: "https://i.ibb.co.com/21nZN8vq/Annotation-2026-02-17-13414.png" 
  },
    { id: 7, name: "Adnan Sami", isOnline: false, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" },
    { id: 8, name: "Rakib Ahmed", isOnline: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" },
    { id: 9, name: "Jubayer Hossain", isOnline: true, avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop" }
  ];

  //localstorage
  const [friends, setFriends] = useState(() => {
    const saved = localStorage.getItem('desh_chat_v101');
    return saved ? JSON.parse(saved) : defaultFriends;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    localStorage.setItem('desh_chat_v101', JSON.stringify(friends));
  }, [friends]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddFriend = () => {
    if (!newName.trim()) return;
    const newFriend = { id: Date.now(), name: newName, isOnline: true, avatar: imagePreview };
    setFriends([newFriend, ...friends]);
    setNewName("");
    setImagePreview(null);
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  const toggleStatus = (id) => {
    setFriends(friends.map(f => f.id === id ? { ...f, isOnline: !f.isOnline } : f));
    setActiveMenuId(null);
  };

  const removeFriend = (id) => {
    setFriends(friends.filter(f => f.id !== id));
    setActiveMenuId(null);
  };

  const totalPages = Math.ceil(friends.length / itemsPerPage);
  const currentFriends = friends.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 min-h-screen font-sans">
      
      {/* Header Section*/}
      <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold dark:text-white text-primary tracking-tight">Friends</h1>
          <p className="text-black text-sm font-medium mt-1">Total {friends.length} active connections</p>
        </div>
        
        {/* right side add fnd */}
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-primary text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 font-bold"
        >
          <UserPlus size={20} /> <span className="hidden sm:inline text-pretty">Add Friend</span>
        </button>
      </div>

      {/* Friends Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {currentFriends.map((friend) => (
          <div key={friend.id} className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            
            {/* Options Menu */}
            <div className="flex justify-end relative z-10">
              <button 
                onClick={() => setActiveMenuId(activeMenuId === friend.id ? null : friend.id)} 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <MoreVertical size={20}/>
              </button>
              
              {activeMenuId === friend.id && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)}></div>
                  <div className="absolute right-0 mt-10 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in zoom-in duration-200">
                    <button onClick={() => toggleStatus(friend.id)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
                      {friend.isOnline ? <><Moon size={18} className="text-amber-500"/> Go Offline</> : <><Globe size={18} className="text-green-500"/> Go Online</>}
                    </button>
                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1 mx-2"></div>
                    <button onClick={() => removeFriend(friend.id)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <UserMinus size={18} /> Unfriend
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Profile info */}
            <div className="flex flex-col items-center -mt-4 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-blue-100 dark:from-blue-900 dark:to-gray-800 rounded-full p-1 shadow-inner">
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full overflow-hidden flex items-center justify-center">
                    {friend.avatar ? (
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-blue-600 dark:text-blue-400 font-black text-3xl">{friend.name[0]}</span>
                    )}
                  </div>
                </div>
                <div className={`absolute bottom-1 right-1 w-5 h-5 border-4 border-white dark:border-gray-900 rounded-full shadow-sm ${friend.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              </div>
              <h3 className="mt-5 font-bold text-gray-900 dark:text-gray-100 text-lg tracking-tight truncate w-full text-center px-2">{friend.name}</h3>
              <p className={`text-[11px] font-extrabold uppercase mt-1 tracking-widest ${friend.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                {friend.isOnline ? 'Online Now' : 'Offline'}
              </p>
            </div>

            {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 ml-3 mt-auto overflow-hidden">
  
  {/* 1st Button Call */}
  <button className="relative group/call overflow-hidden flex items-center justify-center gap-2 px-2 py-3 bg-white rounded-2xl cursor-pointer border-none">
    <span className="relative z-10 text-secondary group-hover/call:text-white transition-colors duration-300 flex items-center gap-1 sm:gap-2">
      <Phone size={18} />
      <span className="text-sm sm:text-base">Call</span>
    </span>
    <span className="absolute inset-0 bg-secondary -translate-y-full group-hover/call:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
  </button>

  {/* 2nd Button Chat */}
  <button className="relative group/chat isolate overflow-hidden px-2 py-3 rounded-2xl text-white bg-primary cursor-pointer border-none outline-none flex items-center justify-center">
    <span className="relative z-30 flex items-center justify-center gap-1 sm:gap-2 pointer-events-none w-full">
      <MessageSquare size={18} className="shrink-0 group-hover/chat:scale-110 transition-transform duration-300" />
      <span className="font-medium text-sm sm:text-base whitespace-nowrap">Chat</span>
    </span>
    <span className="absolute inset-0 bg-secondary -translate-y-full group-hover/chat:translate-y-0 transition-transform duration-300 ease-in-out z-10"></span>
  </button>

</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-center pb-10">
          <div className="flex items-center gap-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 rounded-full shadow-lg">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-20 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <div className="flex gap-1 px-2">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i + 1} 
                  onClick={() => setCurrentPage(i + 1)} 
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all ${
                    currentPage === i + 1 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-20 transition-colors"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-[40px] shadow-2xl p-8 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-black text-primary dark:text-black">New Friend</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500"><X size={20}/></button>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <label className="relative cursor-pointer group">
                <div className="w-28 h-28 rounded-full border-4 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden group-hover:border-blue-500 transition-all">
                  {imagePreview ? (
                    <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                  ) : (
                    <div className="text-center text-gray-400 flex flex-col items-center">
                      <Camera size={32} />
                      <span className="text-[11px] uppercase font-black mt-2 tracking-tighter">Add Photo</span>
                    </div>
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

          {/*  Name Input Field */}
<input 
  type="text" 
  placeholder="Full Name" 
  className="w-full p-5 bg-gray-100 dark:bg-gray-800 border-none rounded-3xl outline-none mb-6 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
  value={newName}
  onChange={(e) => setNewName(e.target.value)}
/>
            <button 
              onClick={handleAddFriend} 
              className="w-full bg-primary text-white py-5 rounded-3xl font-black text-lg hover:bg-secondary shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-[0.98]"
            >
              Connect Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;