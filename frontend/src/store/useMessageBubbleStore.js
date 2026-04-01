import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";
import { useMessageStore } from "./useMessageStore";

export const useMessageBubbleStore = create(() => ({
  addReaction: async (msgId, emoji) => {
    try {
      const res = await axiosSecure.patch(
        `/api/messages/${msgId}/addReaction`,
        { emoji },
      );

      useMessageStore.setState((state) => ({
        messages: state.messages.map((message) =>
          String(message._id) === String(res.data?._id) ? res.data : message,
        ),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send reaction");
    }
  },

  removeReaction: async (msgId) => {
    try {
      const res = await axiosSecure.patch(
        `/api/messages/${msgId}/removeReaction`,
      );

      useMessageStore.setState((state) => ({
        messages: state.messages.map((message) =>
          String(message._id) === String(res.data?._id) ? res.data : message,
        ),
      }));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to remove reaction",
      );
    }
  },
}));
