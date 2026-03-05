import { useMessageStore } from "../../../../../store/useMessageStore";

const ReplyPreview = () => {
  const { replyMessage, clearReplyMessage } = useMessageStore();
  return (
    <div className="bg-gray-200 px-4 py-2 text-sm flex justify-between items-center sticky bottom-0">
      <span className="truncate text-gray-600">Replying to: {replyMessage.text}</span>
      <button onClick={clearReplyMessage} className="text-red-500 text-xs">✕</button>
    </div>
  );
};

export default ReplyPreview;