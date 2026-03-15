import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useFriendStore = create((set) => ({

  friends: [],
  isFriendsLoading: false,

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

}));