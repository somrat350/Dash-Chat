import AddPartnerModal from "../../components/dashboard/messages/AddPartnerModal";
import MessagesSidebar from "../../components/dashboard/messages/MessagesSidebar";
import MessagesView from "../../components/dashboard/messages/MessagesView";
import NoPartnerSelected from "../../components/dashboard/messages/NoPartnerSelected";
import { useMessageStore } from "../../store/useMessageStore";

const Chats = () => {
  const { selectedPartner } = useMessageStore();
  return (
    <>
      <AddPartnerModal />
      <div className="hidden h-full min-h-0 w-full overflow-hidden md:flex">
        <MessagesSidebar />
        {selectedPartner ? <MessagesView /> : <NoPartnerSelected />}
      </div>
      <div className="flex h-full min-h-0 w-full overflow-hidden md:hidden">
        {selectedPartner ? <MessagesView /> : <MessagesSidebar />}
      </div>
    </>
  );
};

export default Chats;
