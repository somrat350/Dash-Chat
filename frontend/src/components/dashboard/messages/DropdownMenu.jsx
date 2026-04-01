import { Reply, Copy, Trash2, Edit, BrushCleaning, Share2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import EditMessageModal from "./EditMessageModal";
import DeleteMessageModal from "./DeleteMessageModal";
import { useMessageStore } from "../../../store/useMessageStore";
import { useAuthStore } from "../../../store/useAuthStore";

const DropdownMenu = ({ msg, isMe, onClose, isDeleted, onForward }) => {
  const { setReplyMessage, deleteMessage } = useMessageStore();
  const { authUser } = useAuthStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const modalId = `editModal-${msg._id}`;

  const handleMessageDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmUnsend = async () => {
    await deleteMessage(msg._id, "everyone", authUser?.email);
    setIsDeleteModalOpen(false);
    onClose();
  };

  return (
    <>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`z-50 absolute bottom-full mb-2 w-40 rounded-2xl bg-base-300 border border-white/10 p-2 shadow-2xl space-y-1 ${isMe ? "right-0" : "left-0"}`}
      >
        {isDeleted ? (
          <>
            {/* Remove Button */}
            <button className="btn rounded-lg w-full justify-start text-error hover:bg-error/10">
              <BrushCleaning size={16} /> Remove
            </button>
          </>
        ) : (
          <>
            {/* Reply Button */}
            <button
              onClick={() => setReplyMessage(msg)}
              className="btn rounded-lg w-full justify-start"
            >
              <Reply size={16} /> Reply
            </button>

            {/* Copy Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(msg.text);
                onClose();
                toast.success("Message copied.");
              }}
              className="btn rounded-lg w-full justify-start"
            >
              <Copy size={16} /> Copy
            </button>

            {/* Forward Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onForward?.(msg);
                onClose();
              }}
              className="btn rounded-lg w-full justify-start"
            >
              <Share2 size={16} /> Forward
            </button>

            {/* Edit Button */}
            {isMe && (
              <button
                onClick={() => document.getElementById(modalId).showModal()}
                className="btn rounded-lg w-full justify-start"
              >
                <Edit size={16} /> Edit
              </button>
            )}

            {/* Delete Button */}
            {isMe && (
              <>
                <div className="divider my-0 opacity-10"></div>
                <button
                  onClick={handleMessageDelete}
                  className="btn rounded-lg w-full justify-start text-error hover:bg-error/10"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </>
            )}
          </>
        )}

        {/* Message Edit Modal */}
        <EditMessageModal msg={msg} />
      </div>

      {isDeleteModalOpen && (
        <DeleteMessageModal
          onConfirmUnsend={handleConfirmUnsend}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default DropdownMenu;
