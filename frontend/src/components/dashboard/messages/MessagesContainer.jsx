import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMessageStore } from "../../../store/useMessageStore";
import MessageBubble from "./MessageBubble";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoMessagesFound from "./NoMessagesFound";

const isSameCalendarDay = (firstDate, secondDate) => {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};

const getMessageDateLabel = (dateValue) => {
  const messageDate = new Date(dateValue);
  if (Number.isNaN(messageDate.getTime())) return "";

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameCalendarDay(messageDate, today)) return "Today";
  if (isSameCalendarDay(messageDate, yesterday)) return "Yesterday";

  return messageDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isSameMessageSender = (firstMessage, secondMessage) => {
  if (!firstMessage || !secondMessage) return false;
  return String(firstMessage.senderId) === String(secondMessage.senderId);
};

const MessagesContainer = () => {
  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const [currentVisibleDate, setCurrentVisibleDate] = useState("");
  const { authUser, socket } = useAuthStore();
  const [activeEmojiId, setActiveEmojiId] = useState(null);

  const {
    messages,
    selectedPartner,
    isMessagesLoading,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
    clearReplyMessage,
  } = useMessageStore();

  const firstUnreadIndex = messages.findIndex((message) => {
    const isIncomingMessage =
      String(message.senderId) === String(selectedPartner?._id);
    const isUnread = message.deliveryStatus !== "seen";
    return isIncomingMessage && isUnread;
  });

  useEffect(() => {
    if (!selectedPartner || !socket) return;
    getMessagesByUserId(selectedPartner._id);
    subscribeToMessage(selectedPartner._id);
    return () => unsubscribeFromMessage();
  }, [
    socket,
    selectedPartner,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
  ]);
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [messages]);
  useEffect(() => {
    clearReplyMessage();
    return () => {
      clearReplyMessage();
    };
  }, [clearReplyMessage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = container.querySelectorAll("[data-message-date]");
      if (children.length === 0) return;

      let visibleDate = "";
      const scrollTop = container.scrollTop;

      for (let child of children) {
        const childScrollTop = child.offsetTop;

        // Check if this element is at the top of the container
        if (childScrollTop <= scrollTop + 60) {
          visibleDate = child.getAttribute("data-message-date") || "";
        } else {
          break;
        }
      }

      setCurrentVisibleDate(visibleDate);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto scroll-thin h-full flex-1 py-5 relative"
    >
      {currentVisibleDate && (
        <div className="sticky top-2 z-30 flex justify-center pointer-events-none">
          <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-base-200/80 text-base-content/70 backdrop-blur-sm shadow-sm">
            {currentVisibleDate}
          </span>
        </div>
      )}
      <div className="w-full p-4 flex flex-col">
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoMessagesFound />
        ) : (
          <>
            {messages.map((msg, index) => {
              const currentLabel = getMessageDateLabel(msg.createdAt);
              const previousMessage = messages[index - 1];
              const nextMessage = messages[index + 1];
              const previousLabel = previousMessage
                ? getMessageDateLabel(previousMessage.createdAt)
                : null;
              const shouldShowDateLabel =
                currentLabel && currentLabel !== previousLabel;
              const shouldShowUnreadDivider = index === firstUnreadIndex;

              const isGroupedWithPrevious =
                isSameMessageSender(msg, previousMessage) &&
                currentLabel === previousLabel;
              const isGroupedWithNext =
                isSameMessageSender(msg, nextMessage) &&
                currentLabel === getMessageDateLabel(nextMessage?.createdAt);
              const isMe = String(msg.senderId) === String(authUser?._id);
              const messageSpacingClass = isMe
                ? isGroupedWithPrevious
                  ? "mt-0.5"
                  : "mt-2"
                : isGroupedWithPrevious
                  ? "mt-1"
                  : "mt-3";

              return (
                <div
                  key={msg._id}
                  className={messageSpacingClass}
                  data-message-date={currentLabel}
                >
                  {shouldShowDateLabel && (
                    <div className="flex justify-center my-2">
                      <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-base-200/60 text-base-content/60">
                        {currentLabel}
                      </span>
                    </div>
                  )}
                  {shouldShowUnreadDivider && (
                    <div className="sticky top-2 z-20 my-3 py-1 flex items-center gap-2">
                      <div className="h-px flex-1 bg-base-300" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full bg-base-200/95 backdrop-blur-sm text-primary shadow-sm">
                        Unread messages
                      </span>
                      <div className="h-px flex-1 bg-base-300" />
                    </div>
                  )}
                  <MessageBubble
                    msg={msg}
                    authUser={authUser}
                    isFirstInGroup={!isGroupedWithPrevious}
                    isGroupedWithNext={isGroupedWithNext}
                    isOpen={activeEmojiId === msg._id}
                    setIsOpen={(isOpen) =>
                      setActiveEmojiId(isOpen ? msg._id : null)
                    }
                  />
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default MessagesContainer;
