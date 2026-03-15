const MessagesLoadingSkeleton = () => {
  return [...new Array(6)].map((_, i) => {
    const isEven = (i + 1) % 2;
    return (
      <div key={i + 1} className={`chat ${isEven ? "chat-start" : "chat-end"}`}>
        <div className="chat-bubble skeleton bg-primary/40 w-48 h-12"></div>
      </div>
    );
  });
};

export default MessagesLoadingSkeleton;
