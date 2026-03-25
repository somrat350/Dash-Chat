import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useMessageStore = create((set, get) => ({
  replyMessage: null,
  messagePartners: [],
  messagePartnersLoading: false,
  messages: [],
  isMessagesLoading: false,
  isMessageSending: false,
  isUserLoading: false,

  newChatPartnerSearchLoading: false,
  newChatPartnerSearchResults: [],
  setEmptyNewChatPartner: () => set({ newChatPartnerSearchResults: [] }),

  selectedPartner: null,
  setSelectedPartner: (partner) => set({ selectedPartner: partner }),

  searchNewChatPartner: async (searchText) => {
    try {
      set({ newChatPartnerSearchLoading: true });
      const res = await axiosSecure.get(
        `/api/messages/searchNewPartner?searchText=${searchText}`,
      );
      set({ newChatPartnerSearchResults: res.data });
    } catch (error) {
      console.error("Failed to fetch chat partners:", error);
      set({ newChatSearchResults: [] });
    } finally {
      set({ newChatPartnerSearchLoading: false });
    }
  },

  getMessagePartners: async () => {
    try {
      set({ messagePartnersLoading: true });
      const res = await axiosSecure.get("/api/messages/messagePartners");
      set({ messagePartners: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ messagePartnersLoading: false });
    }
  },

  getUserById: async (userId) => {
    try {
      set({ isUserLoading: true });
      const res = await axiosSecure.get(`/api/users/${userId}`);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load user");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosSecure.get(`/api/messages/chats/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    try {
      const { selectedPartner } = get();
      set({ isMessageSending: true });
      await axiosSecure.post(
        `/api/messages/send/${selectedPartner._id}`,
        messageData,
      );
      get().clearReplyMessage();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      set({ isMessageSending: false });
    }
  },

  subscribeToMessage: (selectedPartner) => {
    if (!selectedPartner) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const isChatMessage =
        newMessage.senderId === selectedPartner ||
        newMessage.receiverId === selectedPartner;

      if (!isChatMessage) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (newMessage.senderId === selectedPartner) {
        axiosSecure
          .patch(`/api/messages/chats/${selectedPartner}/seen`)
          .catch((error) => {
            console.error("Failed to mark message as seen:", error);
          });
      }

      const notificationSound = new Audio("/sounds/notification.mp3");
      notificationSound.currentTime = 0;
      notificationSound
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    });

    socket.on("messageStatusUpdated", (payload) => {
      if (!payload?.messageId) return;

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === payload.messageId
            ? {
                ...msg,
                deliveryStatus: payload.deliveryStatus || msg.deliveryStatus,
                deliveredAt: payload.deliveredAt || msg.deliveredAt,
                seenAt: payload.seenAt || msg.seenAt,
              }
            : msg,
        ),
      }));
    });

    socket.on("reactionUpdated", (updatedMsg) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg._id === updatedMsg._id ? updatedMsg : msg,
        ),
      }));
    });
  },

  unsubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
    socket.off("messageStatusUpdated");
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
      toast.success("Message edit success.");
    } catch (error) {
      console.log("Message edit failed:", error);
      toast.error("Edit failed");
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

  // reply
  setReplyMessage: (msg) => set({ replyMessage: msg }),
  clearReplyMessage: () => set({ replyMessage: null }),

  //  forward
  forwardMessage: async (message, receiverEmail) => {
    try {
      const messageData = {
        text: message.text,
        forwarded: true,
        originalSender: message.sender,
      };
      const res = await axiosSecure.post(
        `/api/messages/send/${receiverEmail}`,
        messageData,
      );
      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (error) {
      console.error("Forward failed", error);
    }
  },
}));
