import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useFriendStore = create((set, get) => ({
  friends: [],
  suggestions: [],
  friendsRequests: [],

  //  suggested friend
  getFriendSuggestions: async () => {
    try {
      const res = await axiosSecure.get("/api/friends/suggestions");
      set({ suggestions: res.data });
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
      set({ friendsRequests: res.data });
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
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Request action failed!");
    }
  },

  //  send friend request
  sendFriendRequest: async (receiverId) => {
    try {
      const res = await axiosSecure.post(`/api/friends/send/${receiverId}`);
      toast.success("Friend request sent");
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  },
  // get friend
  getMyFriends: async () => {
    try {
      const res = await axiosSecure.get("/api/friends");
      set({ friends: res.data });
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
      await axiosSecure.patch("/api/friends/update", {
        friendId: id,
        action: "unfriend",
      });
      await get().getMyFriends();
      return;
    } catch (error) {
      console.error("Unfriend failed", error);
    }
  },
}));
