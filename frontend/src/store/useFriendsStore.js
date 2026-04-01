import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useFriendStore = create((set, get) => ({
  friends: [],
  suggestions: [],
  notifications: [],
  isFriendsLoading: false,
  isSuggestionsLoading: false,
  isNotificationsLoading: false,

  //  suggested friend
  getFriendSuggestions: async () => {
    try {
      const res = await axiosSecure.get("/api/friends/suggestions");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load users");
      return [];
    }
  },
  // fetch friend requests
  getFriendRequests: async () => {
    try {
      const res = await axiosSecure.get("/api/friends/requests");
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to load notifications");
      return [];
    }
  },

  // friendRequestAction
  friendRequestAction: async (id, action) => {
    try {
      const res = await axiosSecure.post("/api/friends/respond", {
        requestId: id,
        action,
      });
      if (action === "accepted") {
        await get().getMyFriends();
      }
      toast.success(`Friend request ${action}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Request action failed!");
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
      const res = await axiosSecure.get("/api/friends");
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to load friends");
      return [];
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
