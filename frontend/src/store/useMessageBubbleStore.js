import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageBubbleStore = create(() => ({
  addReaction: async (msgId, emoji) => {
    try {
      console.log(emoji);
      const res = await axiosInstance.patch(
        `/api/messages/${msgId}/addReaction`,
        { emoji },
      );
      console.log(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reaction");
    }
  },

  removeReaction: async (msgId) => {
    try {
      await axiosInstance.patch(`/api/messages/${msgId}/removeReaction`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to remove reaction",
      );
    }
  },
}));
