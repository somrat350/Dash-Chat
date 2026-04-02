const DeleteMessageModal = ({ onConfirmUnsend, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-2xl p-5 w-full max-w-sm shadow-xl border border-base-300">
        <h3 className="text-lg font-semibold mb-2">Unsend message?</h3>
        <p className="text-sm text-base-content/70 mb-5">
          This message will be removed from the chat.
        </p>

        <div className="flex justify-end gap-2">
          <button className="btn btn-sm" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-sm btn-error text-white"
            onClick={onConfirmUnsend}
          >
            Unsend
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMessageModal;
