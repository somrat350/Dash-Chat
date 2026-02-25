import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";

export const useMessageStore = create((set, get) => ({
  selectedPartner: null,
  messagePartners: [],
  messagePartnersLoading: false,
  messages: [],
  isMessagesLoading: false,
  isMessageSending: false,

  setSelectedPartner: (selectedPartner) => set({ selectedPartner }),

  fetchMessagePartners: async () => {
    try {
      set({ messagePartnersLoading: true });
      const res = await axiosSecure.get("/api/messages/messagePartners");
      set({
        messagePartners: Array.isArray(res.data) ? res.data : [],
        messagePartnersLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch chat partners:", error);
      set({ messagePartners: [], messagePartnersLoading: false });
    }
  },
  getMessagesByUserEmail: async (userEmail) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosSecure.get(`/api/messages/chats/${userEmail}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedPartner, messages } = get();
    try {
      set({ isMessageSending: true });
      const res = await axiosSecure.post(
        `/api/messages/send/${selectedPartner.email}`,
        messageData,
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      set({ isMessageSending: false });
    }
  },
}));
