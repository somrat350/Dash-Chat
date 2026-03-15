import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";

export const useCallStore = create((set) => ({
  isCallLoading: false,
  currentCallId: null,

  setCurrentCall: (callId) => set({ currentCallId: callId }),
  clearCurrentCall: () => set({ currentCallId: null }),

  initiateCall: async (receiverId, type = "audio") => {
    try {
      set({ isCallLoading: true });
      const res = await axiosSecure.post("/api/calls", {
        receiverId,
        type,
        status: "received",
        duration: 0,
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
