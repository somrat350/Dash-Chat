import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";
import { useMessageStore } from "./useMessageStore";
import { useAuthStore } from "./useAuthStore";

const updateOptimisticReaction = (msgId, updater) => {
  useMessageStore.setState((state) => ({
    messages: state.messages.map((message) =>
      String(message._id) === String(msgId) ? updater(message) : message,
    ),
  }));
};

export const useMessageBubbleStore = create(() => ({
  addReaction: async (msgId, emoji) => {
    const authUser = useAuthStore.getState().authUser;
    const previousMessages = useMessageStore.getState().messages;

    updateOptimisticReaction(msgId, (message) => ({
      ...message,
      reaction: emoji,
      reactionBy: authUser?._id || message.reactionBy || null,
    }));

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
      useMessageStore.setState({ messages: previousMessages });
      toast.error(error?.response?.data?.message || "Failed to send reaction");
    }
  },

  removeReaction: async (msgId) => {
    const previousMessages = useMessageStore.getState().messages;

    updateOptimisticReaction(msgId, (message) => ({
      ...message,
      reaction: null,
      reactionBy: null,
    }));

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
      useMessageStore.setState({ messages: previousMessages });
      toast.error(
        error?.response?.data?.message || "Failed to remove reaction",
      );
    }
  },
}));
