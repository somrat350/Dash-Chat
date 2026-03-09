import React from "react";

const DeleteModal = ({ isSender, onDeleteForMe, onDeleteForEveryone, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center pointer-events-auto">
        <h3 className="text-lg font-semibold mb-4">Delete Message</h3>


       
        {isSender && (
          <button
            className="px-12 py-2 mb-2  rounded-full bg-green-400 rounded hover:bg-green-500"
            onClick={onDeleteForEveryone}
          >
            Delete for everyone
          </button>
        )}

        <button
          className="px-12 py-2 mb-2 rounded-full  bg-green-400  hover:bg-green-500"
          onClick={onDeleteForMe}
        >
          Delete for me
        </button>


        <button
          className=" px-12 py-2 rounded-full  bg-green-400 rounded hover:bg-green-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;