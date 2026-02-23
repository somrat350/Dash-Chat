import ChatHeader from "../../components/conversation/chats/large-view/messages/ChatHeader";
import Sidebar from "../../components/conversation/chats/large-view/sidebar/Sidebar";
import Home from "../../components/conversation/chats/mobile-view/Home";

const ChatHome = () => {
  return (
    <>
      {/* Large view */}
      <div className=" hidden md:grid grid-cols-3 border-l border-primary/30 h-full w-full">
        {/* Chat sidebar */}
        <div className="col-span-1 border-r border-primary/30 ">
          <Sidebar />
        </div>
        {/* Message portion */}
        <div className="col-span-2">
          <ChatHeader />
        </div>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        <Home />
      </div>
    </>
  );
};

export default ChatHome;
