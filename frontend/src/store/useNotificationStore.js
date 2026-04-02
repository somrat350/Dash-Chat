import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useNotificationStore = create(() => ({
  getNotifications: async (page = 1, limit = 5) => {
    try {
      const res = await axiosSecure.get(
        `/api/friends/notifications?limit=${limit}&page=${page}`,
      );
      return res.data.notifications;
    } catch (error) {
      console.log(error);
      toast.error("Failed to load notifications");
      return [];
    }
  },

  markNotificationAsRead: async (id) => {
    try {
      const res = await axiosSecure.patch(
        `/api/friends/notifications/${id}/read`,
      );
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark notification as read");
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      await axiosSecure.patch("/api/friends/notifications/read-all");
      toast.success("All notifications marked as read");
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark all notifications as read");
    }
  },
}));
