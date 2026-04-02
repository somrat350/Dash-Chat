import { Search, X } from "lucide-react";
import { useMessageStore } from "../../../../../store/useMessageStore";
import { useEffect, useState, useCallback } from "react";
import { axiosSecure } from "../../../../../lib/axios";
import { useQuery } from "@tanstack/react-query";

const NewChatSearch = () => {
  const { setSelectedPartner } = useMessageStore();
  const [srcQuery, setSrcQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(srcQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [srcQuery]);

  // Fetch search results
  const { data: newChatSearchResults = [], isLoading: newChatSearchLoading } =
    useQuery({
      queryKey: ["newChatSearch", debouncedQuery],
      queryFn: async () => {
        if (!debouncedQuery.trim()) return [];
        const res = await axiosSecure.get("/api/messages/search", {
          params: { q: debouncedQuery },
        });
        return res.data || [];
      },
      enabled: debouncedQuery.trim().length > 0,
    });

  const closeModal = useCallback(() => {
    const modal = document.getElementById("new_chat_search_modal");
    if (modal) {
      modal.close();
      setTimeout(() => {
        setSrcQuery("");
      }, 100);
    }
  }, []);

  const handleUserSelect = useCallback(
    (user) => {
      setSelectedPartner(user);
      closeModal();
    },
    [setSelectedPartner, closeModal],
  );

  return (
    <div>
      <dialog
        id="new_chat_search_modal"
        className="modal z-50 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target.id === "new_chat_search_modal") {
            closeModal();
          }
        }}
      >
        <div className="modal-box w-11/12 sm:max-w-md mx-auto rounded-lg shadow-xl">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Start New Chat</h3>
            <button
              type="button"
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-3">
            <div className="flex items-center bg-base-200 rounded-full px-4 border border-primary/50">
              <Search size={18} className="text-gray-500 shrink-0" />
              <input
                type="text"
                value={srcQuery}
                onChange={(e) => setSrcQuery(e.target.value)}
                placeholder="Search users..."
                className="bg-transparent outline-none px-3 py-2 sm:py-3 w-full text-sm"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeModal();
                }}
              />
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto">
            {newChatSearchLoading ? (
              <div className="flex justify-center items-center h-20 text-gray-400 text-sm">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : newChatSearchResults.length > 0 ? (
              newChatSearchResults.map((user) => (
                <button
                  key={user._id}
                  type="button"
                  onClick={() => handleUserSelect(user)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/20 rounded-lg cursor-pointer transition text-left"
                >
                  <img
                    src={user.photoURL || "/default-avatar.jpg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="flex items-center justify-center h-20 text-gray-400 text-sm">
                {srcQuery.trim()
                  ? "No users found"
                  : "Search a user to start chat"}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewChatSearch;
