import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMessageStore } from "../../../store/useMessageStore";
import MessageBubble from "./MessageBubble";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoMessagesFound from "./NoMessagesFound";
import { useAppearanceStore } from "../../../store/useAppearanceStore";

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

const MessagesContainer = ({ searchQuery = "" }) => {
  const { chatBgColor, chatBgImage, overlayOpacity } = useAppearanceStore();
  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const shouldAutoScrollRef = useRef(true);
  const dateNodesRef = useRef([]);
  const scrollRafRef = useRef(null);
  const lastAnimatedMessageIdRef = useRef(null);
  const [currentVisibleDate, setCurrentVisibleDate] = useState("");
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const { authUser, socket } = useAuthStore();
  const [activeEmojiId, setActiveEmojiId] = useState(null);

  const bgStyle = chatBgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url(${chatBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : chatBgColor
      ? { backgroundColor: chatBgColor }
      : {};

  const {
    messages,
    selectedPartner,
    isMessagesLoading,
    getMessagesByUserId,
    subscribeToMessage,
    unsubscribeFromMessage,
    clearReplyMessage,
    requestNotificationPermission,
  } = useMessageStore();

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredMessages = useMemo(() => {
    if (!normalizedSearchQuery) return messages;

    return messages.filter((message) => {
      const callMeta = message.callData
        ? `${message.callData.callType || ""} ${message.callData.status || ""} call`
        : "";
      const searchableText =
        `${message.text || ""} ${message.messageType || ""} ${callMeta}`.toLowerCase();
      return searchableText.includes(normalizedSearchQuery);
    });
  }, [messages, normalizedSearchQuery]);

  const firstUnreadIndex = filteredMessages.findIndex((message) => {
    const isIncomingMessage =
      String(message.senderId) === String(selectedPartner?._id);
    const isUnread = message.deliveryStatus !== "seen";
    return isIncomingMessage && isUnread;
  });

  useEffect(() => {
    if (!socket) return;
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [socket, subscribeToMessage, unsubscribeFromMessage]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("Notification" in window)) return;
    if (!window.isSecureContext) return;

    const askedBefore = window.localStorage.getItem(
      "dashchat-desktop-notification-asked",
    );

    const tryRequestPermission = async () => {
      const permission = await requestNotificationPermission();
      if (permission && permission !== "default") {
        window.localStorage.setItem("dashchat-desktop-notification-asked", "1");
      }
    };

    if (!askedBefore && Notification.permission === "default") {
      // Some browsers block non-user-gesture prompts; best effort on mount.
      tryRequestPermission();
    }

    if (Notification.permission !== "default") return;

    // Retry on the first user interaction so browsers can show the prompt.
    const handleFirstUserGesture = () => {
      tryRequestPermission();
    };

    window.addEventListener("pointerdown", handleFirstUserGesture, {
      once: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserGesture, {
        capture: true,
      });
    };
  }, [requestNotificationPermission]);

  useEffect(() => {
    const selectedPartnerId =
      selectedPartner?._id ||
      selectedPartner?.id ||
      selectedPartner?.userId ||
      selectedPartner?.user?._id;
    if (!selectedPartnerId || !socket) return;

    getMessagesByUserId(selectedPartnerId);
  }, [selectedPartner, socket, getMessagesByUserId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldAutoScrollRef.current) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    dateNodesRef.current = Array.from(
      container.querySelectorAll("[data-message-date]"),
    );
  }, [filteredMessages]);

  const scrollToLatestMessage = () => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    shouldAutoScrollRef.current = true;
    setShowScrollToBottom(false);
  };

  useEffect(() => {
    clearReplyMessage();
    return () => {
      clearReplyMessage();
    };
  }, [clearReplyMessage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollDerivedState = () => {
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      shouldAutoScrollRef.current = distanceFromBottom < 120;

      const children = dateNodesRef.current;
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

      setCurrentVisibleDate((prev) =>
        prev === visibleDate ? prev : visibleDate,
      );
    };

    const handleScroll = () => {
      if (scrollRafRef.current !== null) return;

      scrollRafRef.current = window.requestAnimationFrame(() => {
        updateScrollDerivedState();
        scrollRafRef.current = null;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollDerivedState();

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [messages, filteredMessages]);

  useEffect(() => {
    const container = containerRef.current;
    const endMarker = messageEndRef.current;

    if (!container || !endMarker || messages.length === 0) {
      setShowScrollToBottom(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when latest message marker is out of view.
        setShowScrollToBottom(!entry.isIntersecting);
      },
      {
        root: container,
        threshold: 0.1,
      },
    );

    observer.observe(endMarker);

    return () => {
      observer.disconnect();
    };
  }, [messages]);

  useEffect(() => {
    const latestMessage = filteredMessages[filteredMessages.length - 1];
    if (!latestMessage?._id) return;

    // Skip animating the very first render to keep initial load snappy.
    if (!lastAnimatedMessageIdRef.current) {
      lastAnimatedMessageIdRef.current = latestMessage._id;
      return;
    }

    if (
      String(lastAnimatedMessageIdRef.current) === String(latestMessage._id)
    ) {
      return;
    }

    const container = containerRef.current;
    const latestNode = container?.querySelector(
      `[data-message-id="${latestMessage._id}"]`,
    );

    if (latestNode?.animate) {
      latestNode.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0px)" },
        ],
        {
          duration: 180,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );
    }

    lastAnimatedMessageIdRef.current = latestMessage._id;
  }, [filteredMessages]);

  return (
    <div className="relative flex-1 min-h-0">
      <div
        style={bgStyle}
        ref={containerRef}
        className="overflow-y-auto scroll-thin h-full py-5"
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
          ) : filteredMessages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-base-content/60">
              No messages found for "{searchQuery.trim()}"
            </div>
          ) : (
            <>
              {filteredMessages.map((msg, index) => {
                const currentLabel = getMessageDateLabel(msg.createdAt);
                const previousMessage = filteredMessages[index - 1];
                const nextMessage = filteredMessages[index + 1];
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
                    data-message-id={msg._id}
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

      <button
        type="button"
        onClick={scrollToLatestMessage}
        className={`absolute bottom-4 right-4 z-[90] btn btn-circle bg-primary text-primary-content border-2 border-base-100 shadow-2xl transition-all duration-200 ${
          showScrollToBottom
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-90 pointer-events-none"
        }`}
        aria-label="Scroll to latest message"
        title="Go to latest message"
      >
        <ChevronDown className="size-5" />
      </button>
    </div>
  );
};

export default MessagesContainer;
