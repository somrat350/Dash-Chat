import { useState } from "react";
import {
  BellIcon,
  UserPlus,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import Breadcrumb from "../../components/dashboard/Breadcrumb";

const pageFlow = [
  {
    label: "Notifications",
    link: "/dashboard/notifications",
    icon: <BellIcon size={16} />,
  },
];

const initialNotifications = [
  {
    id: 1,
    type: "friend",
    name: "Rahim Ahmed",
    message: "sent you a friend request",
    time: "2 min ago",
    avatar: "https://i.pravatar.cc/150?img=1",
    unread: true,
    section: "Today",
  },
  {
    id: 2,
    type: "message",
    name: "Nusrat Jahan",
    message: "mentioned you in a message",
    time: "10 min ago",
    avatar: "https://i.pravatar.cc/150?img=5",
    unread: true,
    section: "Today",
  },
  {
    id: 3,
    type: "accept",
    name: "Tanvir Hasan",
    message: "accepted your friend request",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/150?img=8",
    section: "Earlier",
  },
];

const iconMap = {
  friend: <UserPlus size={14} className="text-primary" />,
  message: <MessageCircle size={14} className="text-info" />,
  accept: <CheckCircle size={14} className="text-success" />,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const today = notifications.filter((n) => n.section === "Today");
  const earlier = notifications.filter((n) => n.section === "Earlier");

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, unread: false }));
    setNotifications(updated);
  };

  const acceptRequest = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, type: "accept", message: "is now your friend", unread: false }
          : n
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const renderNotifications = (list) => {
    if (list.length === 0) {
      return (
        <div className="text-center py-10 text-sm text-base-content/60">
          No notifications
        </div>
      );
    }

    return list.map((n) => (
      <div
        key={n.id}
        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:bg-base-200 hover:translate-x-1
        ${n.unread ? "border-l-4 border-primary bg-base-200/40" : "border-base-200"}`}
      >
     
        <div className="relative">
          <img
            src={n.avatar}
            alt={n.name}
            className="w-12 h-12 rounded-full object-cover shadow"
          />

          <div className="absolute -bottom-1 -right-1 bg-base-100 border border-base-300 rounded-full p-1">
            {iconMap[n.type]}
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold">{n.name}</span> {n.message}
          </p>

          <p className="text-xs text-base-content/60 mt-1">{n.time}</p>
        </div>

        {/* friend request buttons */}
        {n.type === "friend" && (
          <div className="flex gap-2">
            <button
              onClick={() => acceptRequest(n.id)}
              className="btn btn-xs btn-primary"
            >
              Accept
            </button>

            <button
              onClick={() => removeNotification(n.id)}
              className="btn btn-xs btn-ghost"
            >
              Reject
            </button>
          </div>
        )}
        {n.unread && <span className="w-2 h-2 bg-primary rounded-full"></span>}
      </div>
    ));
  };

  return (
    <div className="space-y-6">

      <Breadcrumb items={pageFlow} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BellIcon className="text-primary" />
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>

        <button
          onClick={markAllRead}
          className="text-sm text-primary hover:underline"
        >
          Mark all as read
        </button>
      </div>
      <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-4 space-y-6">

        <div>
          <h3 className="text-sm font-semibold text-base-content/70 mb-3">
            Today
          </h3>

          <div className="space-y-2">{renderNotifications(today)}</div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-base-content/70 mb-3">
            Earlier
          </h3>

          <div className="space-y-2">{renderNotifications(earlier)}</div>
        </div>

      </div>
    </div>
  );
};

export default Notifications;