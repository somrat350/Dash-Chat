import { Search } from "lucide-react";
import { useMessageStore } from "../../../../../store/useMessageStore";
import { useEffect, useState } from "react";

const NewChatSearch = () => {
  const { newChatSearchLoading, newChatSearchResults, setSelectedPartner } =
    useMessageStore();
  const [srcQuery, setSrcQuery] = useState("");

  useEffect(() => {
    if (srcQuery.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        useMessageStore.getState().searchNewChat(srcQuery);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      useMessageStore.getState().searchNewChat("");
    }
  }, [srcQuery]);
  return (
    <div>
      <dialog
        id="new_chat_search_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div className="px-4 mt-1 mb-2">
            <div className="flex items-center bg-base-200 rounded-full px-3 border border-primary/50">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                value={srcQuery}
                onChange={(e) => setSrcQuery(e.target.value)}
                placeholder="Search or start new chat"
                className="bg-transparent outline-none px-2 py-2 w-full text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-1">
            {newChatSearchLoading ? (
              <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                Loading...
              </div>
            ) : newChatSearchResults.length > 0 ? (
              newChatSearchResults.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedPartner(user);
                    document.getElementById("new_chat_search_modal").close();
                  }}
                  className={`flex items-center px-4 py-3 hover:bg-primary/30 rounded-xl cursor-pointer transition`}
                >
                  <img
                    src={user.photoURL || "/default-avatar.jpg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-medium text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                User not found
              </div>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewChatSearch;
