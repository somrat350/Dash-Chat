import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useFriendStore = create((set) => ({

  friends: [],
  notifications: [],
  isFriendsLoading: false,
  isNotificationsLoading: false,

  // friend suggestion
  getFriendSuggestions: async () => {
    try {

      set({ isFriendsLoading: true });

      const res = await axiosSecure.get("/api/friends/suggestions");

      set({ friends: res.data });

    } catch (error) {

      toast.error(
        error?.response?.data?.message || "Failed to load users"
      );

    } finally {

      set({ isFriendsLoading: false });

    }
  },

  // fetch friend requests
  getFriendRequests: async () => {
    try {

      set({ isNotificationsLoading: true });

      const res = await axiosSecure.get("/api/friends/requests");

      const formatted = res.data.map((req) => ({
        id: req._id,
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
        notifications: state.notifications.map((n) =>
          n.id === id
            ? {
                ...n,
                type: "accept",
                message: "is now your friend",
                unread: false,
              }
            : n
        ),
      }));

      toast.success("Friend request accepted");

    } catch (error) {

      toast.error("Failed to accept request");

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
  sendFriendRequest: async (receiverId) => {

  try {

    await axiosSecure.post(`/api/friends/send/${receiverId}`);

    toast.success("Friend request sent");

  } catch (error) {

    toast.error("Failed to send request");

  }

},

}));

  