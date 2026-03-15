import AddPartnerModal from "../../components/dashboard/messages/AddPartnerModal";
import MessagesSidebar from "../../components/dashboard/messages/MessagesSidebar";
import MessagesView from "../../components/dashboard/messages/MessagesView";
import NoPartnerSelected from "../../components/dashboard/messages/NoPartnerSelected";
import { useMessageStore } from "../../store/useMessageStore";

const Chats = () => {
  const { selectedPartner } = useMessageStore();
  return (
    <>
      <div className="hidden md:flex h-full max-h-[calc(100vh-64px)]">
        <MessagesSidebar />
        <AddPartnerModal />
        {selectedPartner ? <MessagesView /> : <NoPartnerSelected />}
      </div>
      <div className="flex md:hidden h-full max-h-[calc(100vh-64px)]">
        {selectedPartner ? <MessagesView /> : <MessagesSidebar />}
      </div>
    </>
  );
};

export default Chats;
