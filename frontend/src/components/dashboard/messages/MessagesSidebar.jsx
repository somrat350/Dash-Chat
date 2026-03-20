import { Plus, Search, User } from "lucide-react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useEffect } from "react";
import PartnerLoadingSkeleton from "./PartnerLoadingSkeleton";
import NoPartnerFound from "./NoPartnerFound";
import { useAuthStore } from "../../../store/useAuthStore";

const MessagesSidebar = () => {
  const {
    setSelectedPartner,
    selectedPartner,
    messagePartners,
    messagePartnersLoading,
    getMessagePartners,
  } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMessagePartners();
  }, [getMessagePartners]);

  const formatChatTime = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      })
      .toLowerCase()
      .split(" ")
      .join("");
  };

  const openAddPartnerModal = () => {
    document.getElementById("add_partner_modal").showModal();
  };

  return (
    <div className="w-full md:max-w-70 lg:max-w-80 flex flex-col max-h-full overflow-hidden border-r border-base-content/20">
      {/* Header Section */}
      <div className="pb-4 sticky top-0 bg-base-100 z-10 px-2 pt-1">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4 ml-1">Chats</h2>
          <button
            onClick={openAddPartnerModal}
            className="btn btn-sm btn-circle bg-primary/30 tooltip tooltip-left"
            data-tip="Add partner"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="input w-full pl-10 rounded-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
        </div>
      </div>

      {/* Chat List Section */}
      <div className="mb-3 grid overflow-y-auto scroll-thin">
        {messagePartnersLoading ? (
          <PartnerLoadingSkeleton />
        ) : messagePartners.length === 0 ? (
          <NoPartnerFound />
        ) : (
          messagePartners.map((partner, i) => (
            <div
              onClick={() => setSelectedPartner(partner.user)}
              key={i + 1}
              className={`flex items-center gap-3 p-3 border-b border-base-content/20 cursor-pointer transition-colors ${selectedPartner?._id === partner?.user._id ? "bg-primary/70" : "bg-base-100 hover:bg-primary/20"}`}
            >
              {/* Avatar */}
              <div className={`avatar relative`}>
                <div
                  className={`text-base-content rounded-full w-12 h-12 flex items-center justify-center ${partner.user.photoURL ? "" : "border border-base-content"}`}
                >
                  {partner.user.photoURL ? (
                    <img src={partner.user.photoURL} alt={partner.user.name} />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${onlineUsers?.includes(partner?.user._id) ? "bg-success" : "bg-gray-500"}`}
                ></span>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {partner.user.name}
                </h3>
                <p className="text-xs text-base-content/70 truncate">
                  {partner.lastMessage}
                </p>
              </div>

              {/* Timestamp */}
              <div className="text-xs text-base-content/70 whitespace-nowrap self-start mt-1">
                {formatChatTime(partner.time)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesSidebar;
