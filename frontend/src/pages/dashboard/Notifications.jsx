import { BellIcon } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationsCard from "../../components/dashboard/notifications/NotificationsCard";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";

const Notifications = () => {
  const { getNotifications, markAllNotificationsAsRead } =
    useNotificationStore();
  const { socket } = useAuthStore();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await getNotifications(),
  });

  const queryClient = useQueryClient();

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  useEffect(() => {
    socket.on("newNotification", (newNotification) => {
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return [newNotification];
        return [newNotification, ...oldData];
      });
    });

    return () => socket.off("newNotification");
  }, [socket, queryClient]);

  const isToday = (dateInput) => {
    if (!dateInput) return;
    const date = new Date(dateInput);
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const today = notifications.filter((n) => isToday(n?.createdAt));
  const earlier = notifications.filter((n) => !isToday(n?.createdAt));

  const markAllRead = async () => {
    if (!notifications.some((n) => !n.isRead)) return;
    await markAllNotificationsAsRead();
    queryClient.setQueryData(["notifications"], (oldData = []) =>
      oldData.map((n) => ({ ...n, isRead: true })),
    );
  };

  const renderNotifications = (list = []) => {
    if (!list.length) {
      return (
        <div className="text-center p-4 py-10 text-sm text-base-content/60">
          No notifications
        </div>
      );
    }

    return list.map((n) => <NotificationsCard key={n._id} notification={n} />);
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
            unreadCount === 0
              ? "opacity-40 pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          Mark all as read
        </button>
      </div>

      {isLoading ? (
        <div className="bg-base-100 border border-base-300 rounded-2xl shadow-sm p-8 text-center text-base-content/70">
          Loading notifications...
        </div>
      ) : (
        <div className="bg-base-200 border border-base-300 rounded-2xl shadow-sm p-4 space-y-6">
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
