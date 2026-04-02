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
        className={`z-50 absolute top-full mt-2 w-40 overflow-hidden rounded-xl border border-base-content/10 bg-base-100/95 shadow-2xl backdrop-blur-sm ${isMe ? "right-0" : "left-0"}`}
      >
        {isDeleted ? (
          <>
            {/* Remove Button */}
            <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-error transition-colors hover:bg-base-200">
              <BrushCleaning size={15} /> Remove
            </button>
          </>
        ) : (
          <div className="divide-y divide-base-content/10">
            {/* Reply Button */}
            <button
              onClick={() => {
                setReplyMessage(msg);
                onClose();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-base-200"
            >
              <Reply size={15} /> Reply
            </button>

            {/* Copy Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(msg.text);
                onClose();
                toast.success("Message copied.");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-base-200"
            >
              <Copy size={15} /> Copy
            </button>

            {/* Forward Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onForward?.(msg);
                onClose();
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-base-200"
            >
              <Share2 size={15} /> Forward
            </button>

            {/* Edit Button */}
            {isMe && (
              <button
                onClick={() => document.getElementById(modalId).showModal()}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-base-200"
              >
                <Edit size={15} /> Edit
              </button>
            )}

            {/* Delete Button */}
            {isMe && (
              <>
                <button
                  onClick={handleMessageDelete}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-error transition-colors hover:bg-error/10"
                >
                  <Trash2 size={15} /> Delete
                </button>
              </>
            )}
          </div>
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
