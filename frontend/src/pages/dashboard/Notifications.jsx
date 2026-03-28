import { useEffect } from "react";
import { BellIcon, UserPlus, MessageCircle, CheckCircle } from "lucide-react";
import { useFriendStore } from "../../store/useFriendsStore";

const iconMap = {
  friend: <UserPlus size={14} className="text-primary" />,
  message: <MessageCircle size={14} className="text-info" />,
  accept: <CheckCircle size={14} className="text-success" />,
  reject: <CheckCircle size={14} className="text-warning" />,
  unfriend: <MessageCircle size={14} className="text-error" />,
};

const Notifications = () => {
  const {
    notifications = [],
    isNotificationsLoading,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriendStore();

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  // Unread count
  const unreadCount = notifications.filter((n) => n.unread).length;

  const today = notifications.filter((n) => n.section === "Today");
  const earlier = notifications.filter((n) => n.section === "Earlier");

  const markAllRead = () => {
    if (!notifications.some((n) => n.unread)) return;
    markAllNotificationsAsRead();
  };

  const renderNotifications = (list) => {
    if (!list.length) {
      return (
        <div className="text-center p-4 py-10 text-sm text-base-content/60">
          No notifications
        </div>
      );
    }

    return list.map((n) => (
      <div
        key={n.id}
        onClick={() => n.unread && markNotificationAsRead(n.id)}
        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:bg-base-200 hover:translate-x-1
        ${
          n.unread
            ? "border-l-4 border-primary bg-base-200/40"
            : "border-base-200"
        }`}
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
          {n.unread && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border border-base-100"></span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold">{n.name}</span> {n.message}
          </p>

          <p className="text-xs text-base-content/60 mt-1">{n.time}</p>
        </div>

        {/* friend request actions */}
        {n.type === "friend" && (
          <div className="flex gap-2">
            <button
              onClick={() => acceptFriendRequest(n.id)}
              className="btn btn-xs btn-primary"
            >
              Accept
            </button>

            <button
              onClick={() => rejectFriendRequest(n.id)}
              className="btn btn-xs btn-ghost"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div className="relative flex items-center justify-between">
        <div className="relative flex items-center gap-3">
          <BellIcon className="text-primary" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </span>
          )}
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>

        <button
          onClick={markAllRead}
          className={`text-sm text-primary hover:underline ${
            unreadCount === 0 ? "opacity-40 pointer-events-none" : ""
          }`}
        >
          Mark all as read
        </button>
      </div>

      {isNotificationsLoading ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-8 text-center text-base-content/70">
          Loading notifications...
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Notifications;
