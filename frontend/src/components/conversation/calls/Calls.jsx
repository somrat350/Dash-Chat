import { Video, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../lib/axios";
import { useAuthStore } from "../../../store/useAuthStore";
import ComponentsLoader from "../../ComponentsLoader";

const Calls = ({ mode = "recent" }) => {
  const { authUser } = useAuthStore();

  const { data: rawCalls = [], isLoading } = useQuery({
    queryKey: ["calls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/calls");
      return res.data;
    },
  });

  const allCalls = rawCalls.map((call) => {
    const isIncoming = call.receiver._id === authUser?._id;
    const otherUser = isIncoming ? call.caller : call.receiver;
    return {
      id: call._id,
      name: otherUser.name,
      avatar: otherUser.photoURL || "/default-avatar.jpg",
      type: call.status === "scheduled"
        ? "Scheduled"
        : isIncoming
          ? "Incoming"
          : "Outgoing",
      time: new Date(call.scheduledAt || call.createdAt).toLocaleString(
        "en-US",
        { day: "numeric", month: "long", hour: "numeric", minute: "2-digit", hour12: true },
      ),
      status: call.status === "missed" ? "missed" : call.status === "scheduled" ? "scheduled" : "recent",
    };
  });

  const titleMap = {
    recent: "Recent Calls",
    missed: "Missed Calls",
    scheduled: "Scheduled Calls",
  };

  const calls =
    mode === "recent"
      ? allCalls
      : allCalls.filter((call) => call.status === mode);

  if (isLoading) return <ComponentsLoader />;

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{titleMap[mode] || "Calls"}</h2>

      {calls.length === 0 ? (
        <div className="p-6 text-center opacity-70 bg-base-200 rounded-md">
          No calls found in this section.
        </div>
      ) : (
        <ul className="space-y-3">
          {calls.map((call) => (
            <li
              key={call.id}
              className="flex justify-between items-center p-3 bg-base-200 rounded-md hover:bg-base-300 transition"
            >
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-11 h-11 rounded-full">
                    <img src={call.avatar} alt={call.name} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{call.name}</p>
                  <p className="text-sm opacity-70">
                    {call.type} • {call.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="btn btn-sm btn-primary flex items-center gap-1">
                  <Phone size={16} />
                  Call
                </button>
                <button className="btn btn-sm btn-secondary flex items-center gap-1">
                  <Video size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calls;
