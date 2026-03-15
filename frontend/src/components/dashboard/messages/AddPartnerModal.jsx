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
  return (
    <>
      <dialog
        id="add_partner_modal"
        className="modal modal-bottom sm:modal-middle"
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
                  className={`flex items-center justify-between gap-1 p-3 border-b border-base-content/20 transition-colors bg-base-100 hover:bg-primary/20`}
                >
                  <div className="flex items-center justify-start gap-1">
                    {/* Avatar */}
                    <div className={`avatar relative`}>
                      <div
                        className={`text-base-content rounded-full w-12 h-12 flex items-center justify-center ${user.photoURL ? "" : "border border-base-content"}`}
                      >
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.name} />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-base-200 ${onlineUsers?.includes(user._id) ? "bg-success" : "bg-gray-500"}`}
                      ></span>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col items-start">
                      <h3 className="font-semibold text-sm break-all line-clamp-1">
                        {user.name}
                      </h3>
                      <p className="text-xs text-base-content/70 break-all line-clamp-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn btn-sm btn-primary">
                      Add Friend
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPartner(user);
                        document.getElementById("add_partner_modal").close();
                      }}
                      className="btn btn-sm btn-primary btn-outline"
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddPartnerModal;
