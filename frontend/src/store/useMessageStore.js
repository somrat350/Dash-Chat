import { create } from "zustand";
import { axiosSecure } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const createMessageSound = (src, volume) => {
  if (typeof Audio === "undefined") return null;
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = volume;
  return audio;
};

const incomingMessageSound = createMessageSound(
  "/sounds/notification.mp3",
  0.8,
);
const outgoingMessageSound = createMessageSound(
  "/sounds/notification.mp3",
  0.5,
);

const playMessageSound = (audio) => {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

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
  setMessages: (messages) => set({ messages }),

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

      // Mark messages as seen when chat opens
      axiosSecure.patch(`/api/messages/chats/${userId}/seen`).catch((error) => {
        console.error("Failed to mark messages as seen:", error);
      });
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
      const receiverId =
        selectedPartner?._id ||
        selectedPartner?.id ||
        selectedPartner?.userId ||
        selectedPartner?.user?._id;

      if (!receiverId) {
        toast.error("No valid user selected");
        return;
      }

      set({ isMessageSending: true });
      const res = await axiosSecure.post(
        `/api/messages/send/${receiverId}`,
        messageData,
      );

      if (res?.data?._id) {
        set((state) => {
          const alreadyExists = state.messages.some(
            (message) => String(message._id) === String(res.data._id),
          );
          if (alreadyExists) return state;
          return { messages: [...state.messages, res.data] };
        });

        playMessageSound(outgoingMessageSound);
      }

      get().clearReplyMessage();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      set({ isMessageSending: false });
    }
  },

  subscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const authUserId = String(useAuthStore.getState().authUser?._id || "");
      const currentSelectedPartner = get().selectedPartner;
      const selectedPartnerId = String(
        currentSelectedPartner?._id ||
          currentSelectedPartner?.id ||
          currentSelectedPartner?.userId ||
          currentSelectedPartner?.user?._id ||
          "",
      );
      const senderId = String(newMessage.senderId || "");
      const receiverId = String(newMessage.receiverId || "");

      const isCurrentChatMessage =
        !!selectedPartnerId &&
        (senderId === selectedPartnerId || receiverId === selectedPartnerId);
      const isIncomingForMe = receiverId === authUserId;
      const isRelevantToMe =
        senderId === authUserId || receiverId === authUserId;

      if (isCurrentChatMessage) {
        set((state) => {
          const alreadyExists = state.messages.some(
            (message) => String(message._id) === String(newMessage._id),
          );
          if (alreadyExists) return state;
          return { messages: [...state.messages, newMessage] };
        });

        if (isIncomingForMe) {
          axiosSecure
            .patch(`/api/messages/chats/${selectedPartnerId}/seen`)
            .catch((error) => {
              console.error("Failed to mark message as seen:", error);
            });
        }
      }

      if (isRelevantToMe) {
        get().getMessagePartners();
      }

      if (isIncomingForMe) {
        playMessageSound(incomingMessageSound);
      }
    });

    socket.on("messageStatusUpdated", (payload) => {
      if (!payload?.messageId) return;

      set((state) => ({
        messages: state.messages.map((msg) =>
          String(msg._id) === String(payload.messageId)
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
    socket.off("reactionUpdated");
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

  clearChatForMe: async (userEmail) => {
    try {
      const { messages } = get();
      if (!messages.length) return;

      await Promise.all(
        messages.map((message) =>
          axiosSecure.patch(`/api/messages/delete/${message._id}`, {
            mode: "me",
            userEmail,
          }),
        ),
      );

      set({ messages: [] });
      await get().getMessagePartners();
      toast.success("Chat cleared");
    } catch (error) {
      console.error("Failed to clear chat", error);
      toast.error("Failed to clear chat");
    }
  },

  deleteChatConversation: async (userEmail, authUserId) => {
    try {
      const { messages } = get();
      if (!messages.length) return;

      await Promise.all(
        messages.map((message) => {
          const isMine = String(message.senderId) === String(authUserId);
          return axiosSecure.patch(`/api/messages/delete/${message._id}`, {
            mode: isMine ? "everyone" : "me",
            userEmail,
          });
        }),
      );

      set({ messages: [] });
      await get().getMessagePartners();
      toast.success("Chat deleted");
    } catch (error) {
      console.error("Failed to delete chat", error);
      toast.error("Failed to delete chat");
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
