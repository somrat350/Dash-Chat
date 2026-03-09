import { useEffect } from "react";
import ChatHeader from "../../../components/conversation/chats/large-view/messages/ChatHeader";
import EmptyChatState from "../../../components/conversation/chats/large-view/messages/EmptyChatState";
import MessageContainer from "../../../components/conversation/chats/large-view/messages/MessageContainer";
import MessageInput from "../../../components/conversation/chats/large-view/messages/MessagesInput";
import Sidebar from "../../../components/conversation/chats/large-view/sidebar/Sidebar";

import Home from "../../../components/conversation/chats/mobile-view/Home";
import { useMessageStore } from "../../../store/useMessageStore";

const ChatHome = () => {
  const { selectedPartner,clearReplyMessage } = useMessageStore();

  //  clear reply 
  useEffect(() => {
    clearReplyMessage(); 
  }, [selectedPartner]);

  return (
    <>
      {/* Large view */}
      <div className=" hidden md:grid grid-cols-3 border-l border-primary/30 h-full w-full ">
        {/* Chat sidebar */}
        <div className="col-span-1 border-r border-primary/30 ">
          <Sidebar />
        </div>
        {/* Message portion */}

        <div className="col-span-2 flex flex-col h-screen relative">
          <div className="absolute top-0 left-0 z-0 w-full h-full flex text-center items-center justify-center opacity-30  pointer-events-none">
            <img src="/DashChat-logo.png" alt="DashChat Logo" />
          </div>
          {selectedPartner ? (
            <>
              <ChatHeader />
              <div className="flex-1 overflow-y-auto px-4">
                {/*  MessageList  */}
                <MessageContainer />
              </div>
              <div className="border-t border-primary/20 relative">
                <MessageInput />
              </div>
            </>
          ) : (
            <EmptyChatState />
          )}
        </div>
      </div>

      {/* Mobile view */}
      <div className="flex flex-col h-screen relative md:hidden">
        <div className="absolute top-0 left-0 z-0 w-full h-full flex text-center items-center justify-center opacity-30  pointer-events-none">
          <img src="/DashChat-logo.png" alt="DashChat Logo" />
        </div>
        {selectedPartner ? (
          <>
            <ChatHeader />
            <div className="flex-1 overflow-y-auto px-4">
              {/*  MessageList  */}
              <MessageContainer />
            </div>
            <div className="border-t border-primary/20">
              <MessageInput />
            </div>
          </>
        ) : (
          <Home />
        )}
      </div>
    </>
  );
};

export default ChatHome;