
import { useState, useEffect, useRef, useMemo } from "react";
import { Users, Wifi, UserPlus, MessageCircle, Search, ChevronLeft, ChevronRight, UserPlus2, Bell } from "lucide-react";
import { Link } from "react-router"; 
import { gsap } from "gsap";
import { useFriendStore } from "../../store/useFriendsStore"; 
import { useAuthStore } from "../../store/useAuthStore";
import UserCard from "../../components/dashboard/messages/UserCard";
import FriendListCard from "../../components/dashboard/messages/FriendListCard";
import StatCard from "../../components/dashboard/StatCard";
import SectionHeader from "../../components/dashboard/messages/SectionHeader";

const Friends = () => {
  const { friends, suggestions, getFriendSuggestions, getMyFriends, notifications, getNotifications } = useFriendStore();
  const { onlineUsers, authUser } = useAuthStore();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [friendIndex, setFriendIndex] = useState(0);
  const [suggestIndex, setSuggestIndex] = useState(0);

  useEffect(() => {
    getMyFriends();
    getFriendSuggestions();
    if (authUser?._id) {
      getNotifications(); 
    }
  }, [authUser?._id, getMyFriends, getFriendSuggestions, getNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications]
  );

  const onlineFriends = friends.filter((f) => onlineUsers.includes(f._id));
  

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const visibleSuggestions = suggestions.slice(suggestIndex, suggestIndex + (isMobile ? 1 : 5));
  const visibleFriends = friends.slice(friendIndex, friendIndex + (isMobile ? 3 : 4));

  const filteredData = (tab) => {
    let list = tab === "friends" ? friends : tab === "online" ? onlineFriends : tab === "suggested" ? suggestions : [...friends, ...suggestions];
    return list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-base-100 min-h-screen pb-20">
      
   
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Friends</h1>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-10 rounded-2xl bg-base-200"
            />
            <Search className="absolute left-3 top-3 opacity-40" size={18} />
          </div>

          <button 
            onClick={() => setActiveTab("suggested")}
            className="btn btn-primary rounded-2xl flex items-center gap-2 px-3 md:px-4"
          >
            <UserPlus2 size={18} />
            <span className="hidden sm:inline">Add Friend</span>
          </button>

          <Link
            to="/dashboard/notifications"
            className="btn btn-circle btn-ghost relative bg-base-200"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-white text-[10px] flex items-center justify-center border-2 border-base-100">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard title="My Friends" value={friends.length} icon={<Users size={18}/>} />
        <StatCard title="Suggested" value={suggestions.length} icon={<UserPlus2 size={18}/>} />
        <StatCard title="Online" value={onlineFriends.length} icon={<Wifi size={18}/>} />
        <StatCard title="Chats" value={friends.length} icon={<MessageCircle size={18}/>} />
      </div>
      <div className="flex gap-2 bg-base-200 p-1 w-full md:w-fit rounded-2xl overflow-x-auto no-scrollbar">
        {["all", "friends", "online", "suggested"].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(""); }}
            className={`px-4 md:px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab ? "bg-primary text-white shadow-md" : "hover:bg-base-300 opacity-60"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

 
      <div className="mt-4">
        {activeTab === "all" && search === "" ? (
          <div className="space-y-10">
            <div className="space-y-4">
              <SectionHeader
                title="Suggested Friends"
                icon={<UserPlus2 size={20} className="text-primary" />}
                onNext={() => setSuggestIndex(prev => (prev + (isMobile ? 1 : 5) < suggestions.length ? prev + (isMobile ? 1 : 5) : prev))}
                onPrev={() => setSuggestIndex(prev => Math.max(prev - (isMobile ? 1 : 5), 0))}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {visibleSuggestions.map(f => <UserCard key={f._id} friend={f} />)}
              </div>
            </div>
            <div className="space-y-4">
              <SectionHeader
                title="My Friends"
                icon={<Users size={20} className="text-primary" />}
                onNext={() => setFriendIndex(prev => (prev + (isMobile ? 1 : 4) < friends.length ? prev + (isMobile ? 1 : 4) : prev))}
                onPrev={() => setFriendIndex(prev => Math.max(prev - (isMobile ? 1 : 4), 0))}
              />
              <div className="flex flex-col gap-3">
                {visibleFriends.map(f => <FriendListCard key={f._id} friend={f} />)}
              </div>
            </div>
          </div>
        ) : (
          <div className={activeTab === "suggested" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
            {filteredData(activeTab).map(f => (
               activeTab === "suggested" ? <UserCard key={f._id} friend={f} /> : <FriendListCard key={f._id} friend={f} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;