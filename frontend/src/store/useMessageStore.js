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

  newChatSearchLoading: false,
  newChatSearchResults: [],

  setSelectedPartner: (selectedPartner) => set({ selectedPartner }),

  searchNewChat: async (srcQuery) => {
    try {
      set({ newChatSearchLoading: true });
      const res = await axiosSecure.get(
        `/api/messages/searchNewPartner?query=${srcQuery}`,
      );
      set({
        newChatSearchResults: Array.isArray(res.data) ? res.data : [],
        newChatSearchLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch chat partners:", error);
      set({ newChatSearchResults: [], newChatSearchLoading: false });
    }
  },
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
