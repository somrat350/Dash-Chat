import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";

export const useCallStore = create((set) => ({
  isCallLoading: false,

  initiateCall: async (receiverId, type = "audio") => {
    try {
      set({ isCallLoading: true });
      const res = await axiosSecure.post("/api/calls", {
        receiverId,
        type,
        status: "received",
        duration: Math.floor(Math.random() * 600) + 10, // simulated duration
      });
      toast.success(
        `${type === "video" ? "Video" : "Audio"} call placed to ${res.data.receiver?.name || "user"}`,
      );
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to place call");
    } finally {
      set({ isCallLoading: false });
    }
  },
}));
