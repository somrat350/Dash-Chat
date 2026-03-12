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
      <div className="modal-box">
        <h2>Edit your message</h2>
        <div className="mt-4">
          <textarea
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea rounded-xl outline-none w-full"
          ></textarea>
          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              onClick={() => document.getElementById(modalId).close()}
              className="btn"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default EditMessageModal;
