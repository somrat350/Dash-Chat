import { useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";

const EditMessageModal = ({ msg }) => {
  const { editMessage } = useMessageStore();
  const [text, setText] = useState(msg.text);
  const modalId = `editModal-${msg._id}`;

  const handleSave = async () => {
    if (!text.trim()) return;
    await editMessage(msg._id, text);
    document.getElementById(modalId).close();
  };

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box rounded-2xl border border-base-content/10 bg-base-100 p-0 text-base-content shadow-2xl">
        <div className="border-b border-base-content/10 px-5 py-4">
          <h2 className="text-base font-semibold text-base-content">
            Edit message
          </h2>
          <p className="mt-1 text-xs text-base-content/60">
            Update your message and save changes.
          </p>
        </div>

        <div className="px-5 py-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="textarea textarea-bordered w-full rounded-xl bg-base-200/50 text-base-content leading-relaxed outline-none placeholder:text-base-content/50 focus:border-primary"
          ></textarea>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={() => document.getElementById(modalId).close()}
              className="btn btn-sm"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-sm btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>

      <form
        method="dialog"
        className="modal-backdrop bg-black/60 backdrop-blur-sm"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditMessageModal;
