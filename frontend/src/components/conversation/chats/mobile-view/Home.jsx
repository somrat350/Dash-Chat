import {
  CameraIcon,
  MessageSquareText,
  MoreVertical,
  PhoneCall,
  Radio,
  Users,
  Search,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import { useMessageStore } from "../../../../store/useMessageStore";
import { useEffect, useState } from "react";
import NewChatSearch from "../large-view/sidebar/NewChatSearch";

const Home = () => {
  const {
    messagePartners,
    fetchMessagePartners,

    setSelectedPartner,
    messagePartnersLoading,
  } = useMessageStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMessagePartners();
  }, [fetchMessagePartners]);

  const openAddPartnerModal = () => {
    document.getElementById("new_chat_search_modal").showModal();
  };

  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col">
      {/** header */}
      <div className="bg-green-400 text-white p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">
            {" "}
            <Link to="/">DashChat</Link>{" "}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openAddPartnerModal();
              }}
              className="hover:opacity-80 transition p-1"
              title="Add new chat"
            >
              <CameraIcon size={22} />
            </button>
            <button
              type="button"
              className="hover:opacity-80 transition p-1"
              title="More options"
            >
              <MoreVertical size={22} />
            </button>
          </div>
        </div>
      </div>

      {/**   Search */}
      <div className="p-3 bg-white sticky top-0 z-10">
        <div className="flex items-center bg-gray-100 rounded-full px-4 gap-2">
          <Search size={18} className="text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-2 bg-gray-100 outline-none text-sm"
          />
        </div>
      </div>
      {/** chat  */}
      <div className="flex-1 overflow-y-auto bg-white pb-20">
        {messagePartnersLoading ? (
          <p className="text-center p-5 text-gray-400">Loading chats...</p>
        ) : messagePartners.filter((partner) =>
            partner.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ).length === 0 ? (
          <div className="text-center p-8 text-gray-400">
            {searchQuery.trim()
              ? "No chats found"
              : "No chats yet. Add a partner to start."}
          </div>
        ) : (
          messagePartners
            .filter((partner) =>
              partner.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((partner) => (
              <button
                key={partner._id}
                type="button"
                onClick={() => setSelectedPartner(partner)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-50 transition text-left bg-white"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={partner.photoURL || "https://via.placeholder.com/150"}
                    alt={partner.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-800 truncate">
                      {partner.name}
                    </h2>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">Now</span>
              </button>
            ))
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white  flex justify-around p-2">
        <NavLink
          to="/conversation/chat"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-green-600" : "text-gray-600"}`
          }
        >
          <MessageSquareText size={22} />
          <span className="text-xs font-semibold">Message</span>
        </NavLink>

        <NavLink
          to="/conversation/calls"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-green-600" : "text-gray-600"}`
          }
        >
          <PhoneCall size={22}></PhoneCall>
          <span className="text-xs font-semibold">Call</span>
        </NavLink>
        <NavLink
          to="/conversation/channel"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-green-600" : "text-gray-600"}`
          }
        >
          <Radio size={22}></Radio>
          <span className="text-xs font-semibold">Channel</span>
        </NavLink>
        <NavLink
          to="/conversation/community"
          className={({ isActive }) =>
            `flex flex-col items-center ${isActive ? "text-green-600" : "text-gray-600"}`
          }
        >
          <Users size={22}></Users>
          <span className="text-xs font-semibold">Community</span>
        </NavLink>
      </div>

      {/* Add Partner Modal */}
      <NewChatSearch />
    </div>
  );
};

export default Home;
