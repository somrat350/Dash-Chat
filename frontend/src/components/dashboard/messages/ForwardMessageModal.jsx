import { Loader2, Search, Send, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useMessageStore } from "../../../store/useMessageStore";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../lib/axios";

const ForwardMessageModal = ({ message, authUserId, onClose }) => {
  const { forwardMessage } = useMessageStore();
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isForwarding, setIsForwarding] = useState(false);

  const { data: messagePartners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ["forwardMessagePartners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/messages/messagePartners");
      return res.data;
    },
  });

  const forwardPreview =
    message?.text || (message?.image ? "Image" : "Message");

  const recipients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return (messagePartners || [])
      .map((partner) => partner?.user)
      .filter(Boolean)
      .filter((user) => String(user?._id) !== String(authUserId))
      .filter((user) => {
        if (!query) return true;
        const name = String(user?.name || "").toLowerCase();
        const email = String(user?.email || "").toLowerCase();
        return name.includes(query) || email.includes(query);
      });
  }, [authUserId, messagePartners, search]);

  const handleForward = async () => {
    if (selectedUserIds.length === 0 || isForwarding) return;

    setIsForwarding(true);
    const ok = await forwardMessage(message, selectedUserIds);
    setIsForwarding(false);

    if (ok) onClose();
  };

  const toggleRecipient = (userId) => {
    setSelectedUserIds((prev) => {
      const normalizedId = String(userId);
      const exists = prev.some((id) => String(id) === normalizedId);

      if (exists) {
        return prev.filter((id) => String(id) !== normalizedId);
      }

      return [...prev, normalizedId];
    });
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-base-content/10 bg-base-100 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-base-content/10 px-4 py-3">
          <h2 className="text-base font-semibold">Forward Message</h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost btn-circle">
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div className="rounded-xl bg-base-200/70 px-3 py-2 text-sm italic line-clamp-2">
            {forwardPreview}
          </div>

          <label className="input input-bordered flex items-center gap-2">
            <Search size={16} className="opacity-60" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search recipient"
            />
          </label>

          <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
            {partnersLoading ? (
              <p className="text-sm text-base-content/60 px-2 py-3">
                Loading recipients...
              </p>
            ) : recipients.length === 0 ? (
              <p className="text-sm text-base-content/60 px-2 py-3">
                No recipients found
              </p>
            ) : (
              recipients.map((user) => {
                const isSelected = selectedUserIds.some(
                  (id) => String(id) === String(user._id),
                );

                return (
                  <button
                    key={user._id}
                    onClick={() => toggleRecipient(user._id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                      isSelected
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
                        user.photoURL
                          ? "bg-base-200"
                          : "border border-base-content/20"
                      }`}
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={18} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.name}
                      </p>
                      <p className="text-xs opacity-75 truncate">
                        {user.email}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <button
            onClick={handleForward}
            disabled={selectedUserIds.length === 0 || isForwarding}
            className="btn btn-primary w-full"
          >
            {isForwarding ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Forwarding...
              </>
            ) : (
              <>
                <Send size={16} />
                {selectedUserIds.length > 1
                  ? `Forward to ${selectedUserIds.length}`
                  : "Forward"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForwardMessageModal;
