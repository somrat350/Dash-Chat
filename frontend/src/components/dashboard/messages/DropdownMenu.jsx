import {
  Reply,
  Copy,
  Forward,
  Trash2,
  Edit,
  BrushCleaning,
} from "lucide-react";
import toast from "react-hot-toast";
import EditMessageModal from "./EditMessageModal";
import { useMessageStore } from "../../../store/useMessageStore";

const DropdownMenu = ({ msg, isMe, onClose, isDeleted }) => {
  const { setReplyMessage } = useMessageStore();
  const modalId = `editModal-${msg._id}`;
  const handleMessageDelete = () => {};
  return (
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

          {/* Edit Button */}
          {isMe && (
            <button
              onClick={() => document.getElementById(modalId).showModal()}
              className="btn rounded-lg w-full justify-start"
            >
              <Edit size={16} /> Edit
            </button>
          )}

          {/* Forward Button */}
          {/* <button className="btn rounded-lg w-full justify-start">
            <Forward size={16} /> Forward
          </button> */}

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
  );
};

export default DropdownMenu;
