import { useState } from "react";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";
import MessagesContainer from "./MessagesContainer";
import InChatCallOverlay from "./InChatCallOverlay";

const MessagesView = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-base-100 relative">
      <MessageHeader
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <MessagesContainer searchQuery={searchQuery} />
      <MessageInput />
      <InChatCallOverlay />
    </div>
  );
};

export default MessagesView;
