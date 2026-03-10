import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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
    const { authUser, userLoading } = useAuthStore.getState();
    if (!authUser || userLoading) return;
    try {
      set({ messagePartnersLoading: true });
      const res = await axiosSecure.get("/api/messages/messagePartners");
      set({
        messagePartners: res.data.filter(
          (d) => d.email !== useAuthStore.getState().authUser.email,
        ),
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
  subscribeToMessage: () => {
    const { selectedPartner } = get();
    if (!selectedPartner) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedPartner =
        newMessage.sender === selectedPartner.email;
      if (!isMessageSentFromSelectedPartner) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      const notificationSound = new Audio("/sounds/notification.mp3");
      notificationSound.currentTime = 0;
      notificationSound
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    });
  },
  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // edit

  editMessage: async (id, updatedText) => {
    try {
      const res = await axiosSecure.patch(`/api/messages/edit/${id}`, {
        text: updatedText,
      });

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === id ? res.data : msg,
        ),
      }));
    } catch (error) {
      console.error("Edit failed", error);
    }
  },

  // delete
  deleteMessage: async (id, mode = "me", userEmail) => {
    try {
      const res = await axiosSecure.patch(`/api/messages/delete/${id}`, {
        mode,
        userEmail,
      });
      const updatedMessage = res.data;
      set((state) => ({
        messages: state.messages.map((msg) => {
          if (msg._id === id) {
            if (updatedMessage.status === "hide") {
              return {
                ...msg,
                status: "hide",
                text: "This message was deleted",
              };
            }
            if (updatedMessage.hiddenFor?.includes(userEmail)) {
              return { ...msg, hiddenFor: updatedMessage.hiddenFor };
            }
          }
          return msg;
        }),
      }));
    } catch (error) {
      console.error("Delete failed", error);
    }
  },
  //  reaction part

  addReaction: (msgId, emoji, userEmail) => {
    const messages = get().messages.map((m) => {
      if (m._id === msgId) {
        const reactions = m.reactions ? [...m.reactions] : [];
        reactions.push({ emoji, by: userEmail });
        return { ...m, reactions };
      }
      return m;
    });
    set({ messages });
  },
}));
