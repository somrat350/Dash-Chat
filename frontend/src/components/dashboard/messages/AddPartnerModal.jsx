import { Loader2, Search, User } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useEffect, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import ComponentsLoader from "../../ComponentsLoader";

const AddPartnerModal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { onlineUsers } = useAuthStore();
  const {
    newChatPartnerSearchLoading: newUserLoading,
    searchNewChatPartner,
    setEmptyNewChatPartner,
    newChatPartnerSearchResults: users,
    setSelectedPartner,
  } = useMessageStore();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        searchNewChatPartner(searchTerm);
      } else {
        setEmptyNewChatPartner([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchNewChatPartner, searchTerm, setEmptyNewChatPartner]);

  const handleCloseModal = () => {
    setSearchTerm("");
    setEmptyNewChatPartner([]);
    document.getElementById("add_partner_modal")?.close();
  };

  return (
    <>
      <dialog
        id="add_partner_modal"
        className="modal modal-bottom sm:modal-middle"
        onClose={() => {
          setSearchTerm("");
          setEmptyNewChatPartner([]);
        }}
      >
        <div className="modal-box flex flex-col max-h-[80vh]">
          <div className="sticky top-0 z-10 bg-base-200 space-y-2 w-full rounded-2xl p-3 mb-1">
            <h3 className="font-bold text-lg text-start">Search partner</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, email or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full h-12 px-6 pr-12 rounded-3 focus:border-primary/50 focus:outline-none"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                {newUserLoading ? (
                  <Loader2 className="animate-spin text-primary/50" size={24} />
                ) : (
                  <Search size={24} />
                )}
              </div>
            </div>
          </div>

          {newUserLoading ? (
            <ComponentsLoader />
          ) : users.length === 0 ? (
            <span className="block w-full text-center my-10">
              No User Found
            </span>
          ) : (
            <div className="grid overflow-y-auto scroll-thin scroll-smooth mt-3">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col gap-3 border-b border-base-content/20 bg-base-100 p-3 transition-colors hover:bg-primary/20 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center justify-start gap-3">
                    {/* Avatar */}
                    <div className="avatar relative shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-base-content ${user.photoURL ? "" : "border border-base-content"}`}
                      >
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${onlineUsers?.includes(user._id) ? "bg-success" : "bg-gray-500"}`}
                      ></span>
                    </div>

                    {/* User Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm break-all line-clamp-1">
                        {user.name}
                      </h3>
                      <p className="text-xs text-base-content/70 break-all line-clamp-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center gap-2 sm:w-auto sm:justify-end">
                    <button className="btn btn-sm btn-primary flex-1 sm:flex-none">
                      Add Friend
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPartner(user);
                        handleCloseModal();
                      }}
                      className="btn btn-sm btn-primary btn-outline flex-1 sm:flex-none"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddPartnerModal;
