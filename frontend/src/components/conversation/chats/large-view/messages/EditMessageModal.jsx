import { useState } from "react";
import { useMessageStore } from "../../../../../store/useMessageStore";

const EditMessageModal = ({ message, onClose }) => {
  const { editMessage } = useMessageStore();
  const [text, setText] = useState(message.text);

  const handleSave = async () => {
    if (!text.trim()) return;
    await editMessage(message._id, text);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl border border-gray-200 pointer-events-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Message</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          rows={4}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMessageModal;