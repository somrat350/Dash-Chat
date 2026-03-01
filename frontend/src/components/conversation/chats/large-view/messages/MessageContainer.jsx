import { useEffect, useRef } from "react";
import { useAuthStore } from "../../../../../store/useAuthStore";
import { useMessageStore } from "../../../../../store/useMessageStore";

// For Message Real Time Formatting
const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isSameDay = (dateA, dateB) => {
  const first = new Date(dateA);
  const second = new Date(dateB);

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const formatMessageDate = (dateValue) => {
  const date = new Date(dateValue);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString([], {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const MessageContainer = () => {
  const { authUser } = useAuthStore();
  const { messages, isMessagesLoading } = useMessageStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500">
        Loading messages...
      </div>
    );
  }

  if (!messages?.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm text-gray-500">
        No messages yet. Start the conversation.
      </div>
    );
  }

  return (
    <div className="space-y-2 py-2">
      {messages.map((message, index) => {
        const isOwnMessage = message.sender === authUser?.email;
        const previousMessage = messages[index - 1];
        const showDateDivider =
          !previousMessage ||
          !isSameDay(message.createdAt, previousMessage.createdAt);

        return (
          <div key={message._id}>
            {showDateDivider && (
              <div className="flex justify-center my-2">
                <span className="px-3 py-1 rounded-full bg-base-200 text-[11px] text-gray-600">
                  {formatMessageDate(message.createdAt)}
                </span>
              </div>
            )}

            <div
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm wrap-break-word ${
                  isOwnMessage
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-base-200 text-base-content rounded-bl-md"
                }`}
              >
                <p>{message.text}</p>

                <p
                  className={`text-[10px] mt-1 text-right ${
                    isOwnMessage ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={endRef} />
    </div>
  );
};

export default MessageContainer;
