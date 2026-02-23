import ChatHeader from "../../components/chats/large-view/ChatHeader";
import Sidebar from "../../components/chats/sidebar/Sidebar";

const ChatHome = () => {
  return (
    <>
      <div className="drawer-content">
        <div className="border-l border-primary/30 h-full w-full grid grid-cols-3">
          {/* Chat sidebar */}
          <div className="col-span-1 border-r border-primary/30 ">
            <Sidebar />
          </div>
          <div className="col-span-2">
            <ChatHeader />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHome;
