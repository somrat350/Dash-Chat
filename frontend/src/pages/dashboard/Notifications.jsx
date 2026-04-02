import { BellIcon, Loader2 } from "lucide-react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import NotificationsCard from "../../components/dashboard/notifications/NotificationsCard";
import { useEffect, useMemo } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNotificationStore } from "../../store/useNotificationStore";
import { useInView } from "react-intersection-observer";

const Notifications = () => {
  const { getNotifications, markAllNotificationsAsRead } =
    useNotificationStore();
  const { socket } = useAuthStore();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: ({ pageParam = 1 }) => getNotifications(pageParam, 5),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 5 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });
  // Flatten the pages into a single array
  const notifications = useMemo(() => {
    return data?.pages.flat() || [];
  }, [data]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  // Infinite Scroll Trigger
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Socket listener for real-time updates
  useEffect(() => {
    socket.on("newNotification", (newNotification) => {
      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return { pages: [[newNotification]], pageParams: [1] };
        return {
          ...oldData,
          pages: [
            [newNotification, ...oldData.pages[0]],
            ...oldData.pages.slice(1),
          ],
        };
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
    if (unreadCount === 0) return;
    await markAllNotificationsAsRead();
    queryClient.setQueryData(["notifications"], (oldData) => ({
      ...oldData,
      pages: oldData.pages.map((page) =>
        page.map((n) => ({ ...n, isRead: true })),
      ),
    }));
  };

  const renderNotifications = (list = []) => {
    return list.map((n) => <NotificationsCard key={n._id} notification={n} />);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <BellIcon className="text-primary w-8 h-8" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 badge badge-primary badge-sm flex items-center justify-center p-2">
                {unreadCount}
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        <button
          onClick={markAllRead}
          disabled={unreadCount === 0}
          className={`btn btn-ghost btn-sm text-primary normal-case ${
            unreadCount === 0
              ? "opacity-40 pointer-events-none"
              : "cursor-pointer"
          }`}
        >
          Mark all as read
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-base-content/60">Loading your updates...</p>
        </div>
      ) : (
        <div className="bg-base-200 border border-base-300 rounded-3xl shadow-sm p-6 space-y-8">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-base-content/50">
              No notifications yet
            </div>
          ) : (
            <>
              {today.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-4 ml-1">
                    Today
                  </h3>
                  <div className="space-y-3">{renderNotifications(today)}</div>
                </div>
              )}

              {earlier.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/50 mb-4 ml-1">
                    Earlier
                  </h3>
                  <div className="space-y-3">
                    {renderNotifications(earlier)}
                  </div>
                </div>
              )}

              {/* Scroll Sentinel & Loading Indicator */}
              <div ref={ref} className="py-4 flex justify-center">
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading more...
                  </div>
                ) : hasNextPage ? (
                  <div ref={ref} className="h-4" /> // Invisible trigger
                ) : (
                  <p className="text-xs text-base-content/40">
                    You've reached the end
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
