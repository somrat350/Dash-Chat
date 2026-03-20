import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";

export const useCallStore = create((set) => ({
  isCallLoading: false,
  currentCallId: null,
  callIntent: null,

  setCurrentCall: (callId) => set({ currentCallId: callId }),
  clearCurrentCall: () => set({ currentCallId: null }),
  setCallIntent: (callIntent) => set({ callIntent }),
  clearCallIntent: () => set({ callIntent: null }),

  initiateCall: async (receiverId, type = "audio", extra = {}) => {
    try {
      set({ isCallLoading: true });
      const res = await axiosSecure.post("/api/calls", {
        receiverId,
        type,
        status: "ringing",
        duration: 0,
        streamCallId: extra.streamCallId || null,
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

  updateCallStatus: async (callId, updates) => {
    if (!callId || !updates) return null;

    const payload = typeof updates === "string" ? { status: updates } : updates;

    if (!payload?.status) return null;

    try {
      const res = await axiosSecure.patch(
        `/api/calls/${callId}/status`,
        payload,
      );
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update call status",
      );
      return null;
    }
  },
}));
