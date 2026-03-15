import { useState } from "react";
import {
  LucidePhone,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Video,
  Clock,
  CalendarClock,
  Search,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";
import ComponentsLoader from "../../components/ComponentsLoader";

const tabs = [
  { key: "all", label: "All Calls" },
  { key: "missed", label: "Missed" },
  { key: "incoming", label: "Incoming" },
  { key: "outgoing", label: "Outgoing" },
  { key: "scheduled", label: "Scheduled" },
];

const Calls = () => {
  const { authUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const { data: rawCalls = [], isLoading } = useQuery({
    queryKey: ["calls"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/calls");
      return res.data;
    },
  });

  // Transform API data to determine incoming/outgoing relative to logged-in user
  const callsData = rawCalls.map((call) => {
    const isIncoming = call.receiver._id === authUser?._id;
    const otherUser = isIncoming ? call.caller : call.receiver;
    const callType =
      call.status === "scheduled"
        ? "scheduled"
        : isIncoming
          ? "incoming"
          : "outgoing";

    return {
      id: call._id,
      name: otherUser.name,
      avatar: otherUser.photoURL || "/default-avatar.jpg",
      type: callType,
      medium: call.type, // "audio" or "video"
      time: new Date(call.scheduledAt || call.createdAt).toLocaleString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        },
      ),
      duration: call.duration
        ? `${Math.floor(call.duration / 60)}:${String(call.duration % 60).padStart(2, "0")}`
        : null,
      status: call.status,
    };
  });

  if (isLoading) return <ComponentsLoader />;

  const filtered = callsData.filter((call) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "missed" && call.status === "missed") ||
      (activeTab === "scheduled" && call.type === "scheduled") ||
      (activeTab !== "missed" &&
        activeTab !== "scheduled" &&
        call.type === activeTab);
    const matchesSearch = call.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCallIcon = (call) => {
    if (call.status === "missed")
      return <PhoneMissed size={18} className="text-error" />;
    if (call.type === "incoming")
      return <PhoneIncoming size={18} className="text-success" />;
    if (call.type === "outgoing")
      return <PhoneOutgoing size={18} className="text-info" />;
    if (call.type === "scheduled")
      return <CalendarClock size={18} className="text-warning" />;
    return <Phone size={18} />;
  };

  const getStatusBadge = (call) => {
    if (call.status === "missed")
      return <span className="badge badge-error badge-sm">Missed</span>;
    if (call.type === "scheduled")
      return <span className="badge badge-warning badge-sm">Scheduled</span>;
    return null;
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-primary">
            <Phone size={24} />
          </div>
          <div className="stat-title text-xs">Total Calls</div>
          <div className="stat-value text-2xl">{callsData.length}</div>
        </div>
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-success">
            <PhoneIncoming size={24} />
          </div>
          <div className="stat-title text-xs">Incoming</div>
          <div className="stat-value text-2xl">
            {callsData.filter((c) => c.type === "incoming").length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-error">
            <PhoneMissed size={24} />
          </div>
          <div className="stat-title text-xs">Missed</div>
          <div className="stat-value text-2xl">
            {callsData.filter((c) => c.status === "missed").length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl p-4">
          <div className="stat-figure text-warning">
            <CalendarClock size={24} />
          </div>
          <div className="stat-title text-xs">Scheduled</div>
          <div className="stat-value text-2xl">
            {callsData.filter((c) => c.type === "scheduled").length}
          </div>
        </div>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex gap-1 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`btn btn-sm ${
                activeTab === tab.key ? "btn-primary" : "btn-ghost"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <label className="input input-bordered input-sm flex items-center gap-2 w-full sm:w-64">
          <Search size={16} className="opacity-50" />
          <input
            type="text"
            placeholder="Search calls..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="grow"
          />
        </label>
      </div>

      {/* Call List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-xl">
          <PhoneMissed size={48} className="mx-auto opacity-30 mb-3" />
          <p className="text-lg font-medium opacity-60">No calls found</p>
          <p className="text-sm opacity-40">
            {callsData.length === 0
              ? "You haven't made any calls yet. Use the call buttons in chat to make your first call!"
              : "Try adjusting your filter or search"}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((call) => (
            <div
              key={call.id}
              className="card bg-base-200 hover:bg-base-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="card-body p-4 gap-3">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-1">
                      <img src={call.avatar} alt={call.name} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{call.name}</h3>
                    <div className="flex items-center gap-1.5 text-sm opacity-60">
                      {getCallIcon(call)}
                      <span className="capitalize">{call.type}</span>
                      {call.medium === "video" && (
                        <Video size={14} className="ml-1" />
                      )}
                    </div>
                  </div>
                  {getStatusBadge(call)}
                </div>

                {/* Time & Duration */}
                <div className="flex items-center justify-between text-sm opacity-60">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {call.time}
                  </span>
                  {call.duration && (
                    <span className="font-mono">{call.duration}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-1">
                  <button className="btn btn-primary btn-sm flex-1 gap-1">
                    <Phone size={15} />
                    Call
                  </button>
                  <button className="btn btn-secondary btn-sm flex-1 gap-1">
                    <Video size={15} />
                    Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calls;
