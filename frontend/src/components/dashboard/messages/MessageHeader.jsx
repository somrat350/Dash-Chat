import { User, X } from "lucide-react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useAuthStore } from "../../../store/useAuthStore";

const MessageHeader = () => {
  const { onlineUsers } = useAuthStore();
  const { selectedPartner, setSelectedPartner } = useMessageStore();
  const isOnline = onlineUsers?.includes(selectedPartner?._id);
  return (
    <div
      className="flex justify-between items-center border-b
   border-base-content/20 pb-3 px-4 pt-4 sticky top-0 z-30 bg-base-100 h-20"
    >
      <div className="flex items-center space-x-3">
        <div className={`avatar relative`}>
          <div
            className={`text-base-content rounded-full w-12 h-12 flex items-center justify-center ${selectedPartner.photoURL || "border border-base-content"}`}
          >
            {selectedPartner.photoURL ? (
              <img src={selectedPartner.photoURL} alt={selectedPartner.name} />
            ) : (
              <User className="w-6 h-6" />
            )}
          </div>
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${isOnline ? "bg-success" : "bg-gray-500"}`}
          ></span>
        </div>

        <div>
          <h3 className="font-medium">{selectedPartner?.name}</h3>
          <p className="text-sm">typing...</p>
        </div>
      </div>

      <button onClick={() => setSelectedPartner(null)}>
        <X
          size={28}
          className="text-primary transition-colors cursor-pointer"
        />
      </button>
    </div>
  );
};

export default MessageHeader;
