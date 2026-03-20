import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
export const useFriendStore = create((set) => ({

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

    toast.error(
      error?.response?.data?.message || "Failed to load users"
    );

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
    const res = await axiosSecure.get("/api/friends/notifications");

    const formatted = res.data.map((n) => ({
      id: n._id,
      type: n.type === "friend_request" ? "friend" : n.type,
      name: n.sender.name,
      avatar: n.sender.photoURL,
      message: n.message,
      time: "now",
      unread: !n.isRead,
      section: "Today",
    }));

    set({ notifications: formatted });

  } catch (error) {
    toast.error("Failed to load notifications");
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
        f._id === id ? { ...f, isFriend: false } : f
      ),
    }));

  } catch (error) {
    console.error("Unfriend failed", error);
  }
},
}));



  