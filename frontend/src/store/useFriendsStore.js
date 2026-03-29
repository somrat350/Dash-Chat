import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const isToday = (date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

const formatNotificationTime = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Just now";

  const now = Date.now();
  const diffMs = now - date.getTime();
  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;

  if (diffMs < minuteMs) return "Just now";
  if (diffMs < hourMs) return `${Math.floor(diffMs / minuteMs)}m ago`;
  if (diffMs < dayMs) return `${Math.floor(diffMs / hourMs)}h ago`;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const mapNotificationType = (type) => {
  if (type === "friend_request") return "friend";
  if (type === "accepted") return "accept";
  if (type === "rejected") return "reject";
  if (type === "unfriend") return "unfriend";
  return type;
};

const formatNotification = (n) => {
  const createdAt = n?.createdAt || new Date().toISOString();
  const createdAtDate = new Date(createdAt);

  return {
    id: n._id,                                    
    type: mapNotificationType(n.type),
    name: n?.sender?.name || "Unknown",
    avatar: n?.sender?.photoURL || "",
    message: n.message,
    time: formatNotificationTime(createdAt),
    unread: !n.isRead,
    section: isToday(createdAtDate) ? "Today" : "Earlier",
    createdAt,
  };
};
export const useFriendStore = create((set, get) => ({
  friends: [],
  suggestions: [],
  notifications: [],
  isFriendsLoading: false,
  isSuggestionsLoading: false,
  isNotificationsLoading: false,

  //  sugestfriend
  getFriendSuggestions: async () => {
    try {
      set({ isSuggestionsLoading: true });

      const res = await axiosSecure.get("/api/friends/suggestions");

      set({
        suggestions: res.data.map((f) => ({
          ...f,
          isFriend: false,
        })),
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
    } finally {
      set({ isSuggestionsLoading: false });
    }
  },
  // fetch friend requests
  getFriendRequests: async () => {
    try {
      set({ isNotificationsLoading: true });

      const res = await axiosSecure.get("/api/friends/requests");

      const formatted = res.data.map((req) => ({
        id: req._id,
        senderId: req.sender._id,
        type: "friend",
        name: req.sender.name,
        avatar: req.sender.photoURL,
        message: "sent you a friend request",
        time: "now",
        unread: true,
        section: "Today",
      }));

      set({ notifications: formatted });
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      set({ isNotificationsLoading: false });
    }
  },

  // accept request
  acceptFriendRequest: async (id) => {
    try {
      await axiosSecure.post("/api/friends/respond", {
        requestId: id,
        action: "accept",
      });
      set((state) => ({
        friends: state.friends.filter((f) => f._id !== id),
      }));
      await get().getMyFriends();

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id
            ? {
                ...n,
                type: "accept",
                message: "is now your friend",
                unread: false,
              }
            : n,
        ),
      }));

      toast.success("Friend request accepted");
    } catch (error) {
      console.log(error);
      toast.error("Request action failed!");
    }
  },
  // reject request
  rejectFriendRequest: async (id) => {
    try {
      await axiosSecure.post("/api/friends/respond", {
        requestId: id,
        action: "reject",
      });

      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));

      toast.success("Request rejected");
    } catch (error) {
      toast.error("Failed to reject request");
    }
  },

  //  sendfriendrequest
  sendFriendRequest: async (receiverId) => {
    try {
      await axiosSecure.post(`/api/friends/send/${receiverId}`);

      toast.success("Friend request sent");
    } catch (error) {
      const message = error?.response?.data?.message;

      if (message?.toLowerCase().includes("already")) {
        toast("Already sent a friend request", { icon: "ℹ️" });
      } else {
        toast.error("Failed to send request");
      }
    }
  },
  // get friend
  getMyFriends: async () => {
    try {
      set({ isFriendsLoading: true });

      const res = await axiosSecure.get("/api/friends");

      set((state) => {
        const suggestions = state.friends.filter((f) => !f.isFriend);
        const myFriends = res.data.map((f) => ({
          ...f,
          isFriend: true,
        }));

        return {
          friends: [...suggestions, ...myFriends],
        };
      });
    } catch (error) {
      toast.error("Failed to load friends");
    } finally {
      set({ isFriendsLoading: false });
    }
  },

  // notification
  getNotifications: async () => {
    try {
      set({ isNotificationsLoading: true });
      const res = await axiosSecure.get("/api/friends/notifications");

      const formatted = res.data.map(formatNotification);

      set({ notifications: formatted });
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      set({ isNotificationsLoading: false });
    }
  },

  markNotificationAsRead: async (id) => {
    try {
      await axiosSecure.patch(`/api/friends/notifications/${id}/read`);
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, unread: false } : n,
        ),
      }));
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      await axiosSecure.patch("/api/friends/notifications/read-all");
      set((state) => ({
        notifications: state.notifications.map((n) => ({
          ...n,
          unread: false,
        })),
      }));
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  },

  // unfriend
  unfriendUser: async (id) => {
    try {
      const { authUser } = useAuthStore.getState();

      await axiosSecure.patch("/api/friends/update", {
        userId: authUser._id,
        friendId: id,
        action: "delete",
      });

      set((state) => ({
        friends: state.friends.map((f) =>
          f._id === id ? { ...f, isFriend: false } : f,
        ),
      }));
    } catch (error) {
      console.error("Unfriend failed", error);
    }
  },
}));
