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

const canUseDesktopNotification = () =>
  typeof window !== "undefined" &&
  typeof Notification !== "undefined" &&
  "Notification" in window &&
  window.isSecureContext;

const isPageBackgrounded = () => {
  if (typeof document === "undefined") return false;
  return document.hidden || !document.hasFocus();
};

const toIdString = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (value._id) return String(value._id);
    if (value.id) return String(value.id);
    if (typeof value.toString === "function") return String(value.toString());
  }
  return String(value);
};

const resolveNotificationAssetUrl = (assetPath) => {
  if (typeof window === "undefined") return assetPath;
  try {
    return new URL(assetPath, window.location.origin).toString();
  } catch {
    return assetPath;
  }
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

  requestNotificationPermission: async () => {
    if (!canUseDesktopNotification()) return "unsupported";
    if (Notification.permission === "granted") return "granted";
    if (Notification.permission === "denied") return "denied";

    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error("Notification permission request failed:", error);
      return "default";
    }
  },

  showIncomingDesktopNotification: (newMessage) => {
    if (!canUseDesktopNotification()) return;
    if (Notification.permission !== "granted") return;

    const state = get();
    const senderId = toIdString(newMessage?.senderId);

    const selectedPartner = state.selectedPartner;
    const selectedPartnerId = String(
      selectedPartner?._id ||
        selectedPartner?.id ||
        selectedPartner?.userId ||
        selectedPartner?.user?._id ||
        "",
    );

    const partnerFromList = state.messagePartners.find(
      (partner) => String(partner?.user?._id || "") === senderId,
    );

    const senderName =
      String(newMessage?.senderName || "").trim() ||
      (senderId && senderId === selectedPartnerId
        ? selectedPartner?.name || selectedPartner?.user?.name
        : null) ||
      partnerFromList?.user?.name ||
      "New message";

    const senderPhoto =
      (senderId && senderId === selectedPartnerId
        ? selectedPartner?.photoURL || selectedPartner?.user?.photoURL
        : null) ||
      partnerFromList?.user?.photoURL ||
      undefined;

    let body = "Sent you a message";
    if (newMessage?.text?.trim()) body = newMessage.text.trim();
    else if (newMessage?.image) body = "📷 Image";
    else if (newMessage?.audio) body = "🎤 Voice message";
    else if (newMessage?.messageType === "call") body = "📞 Call update";

    const appLogo = resolveNotificationAssetUrl("/DashChat-logo.png");

    try {
      const notification = new Notification("DashChat", {
        body: `${senderName}: ${body}`,
        icon: appLogo,
        badge: appLogo,
        image: senderPhoto,
        tag: `message-${senderId || "unknown"}`,
        renotify: true,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    } catch (error) {
      console.error("Desktop notification creation failed:", error);
    }
  },

  searchNewChatPartner: async (searchText) => {
    try {
      set({ newChatPartnerSearchLoading: true });
      const res = await axiosSecure.get(
        `/api/messages/searchNewPartner?searchText=${searchText}`,
      );
      set({ newChatPartnerSearchResults: res.data });
    } catch (error) {
      console.error("Failed to fetch chat partners:", error);
      set({ newChatPartnerSearchResults: [] });
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
      const authUserId = toIdString(useAuthStore.getState().authUser?._id);
      const currentSelectedPartner = get().selectedPartner;
      const selectedPartnerId = toIdString(
        currentSelectedPartner?._id ||
          currentSelectedPartner?.id ||
          currentSelectedPartner?.userId ||
          currentSelectedPartner?.user?._id,
      );
      const senderId = toIdString(newMessage?.senderId);
      const receiverId = toIdString(newMessage?.receiverId);

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

        const shouldShowDesktopNotification = true;

        if (shouldShowDesktopNotification) {
          get().showIncomingDesktopNotification(newMessage);
        }
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
      console.log("🎉 Reaction Updated:", updatedMsg);
      set((state) => ({
        messages: state.messages.map((msg) =>
          String(msg._id) === String(updatedMsg._id) ? updatedMsg : msg,
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

  // forward
  forwardMessage: async (message, receiverIds) => {
    try {
      const normalizedReceiverIds = Array.isArray(receiverIds)
        ? receiverIds.map((id) => String(id || "").trim()).filter(Boolean)
        : [String(receiverIds || "").trim()].filter(Boolean);

      const uniqueReceiverIds = [...new Set(normalizedReceiverIds)];

      if (uniqueReceiverIds.length === 0) {
        toast.error("Please select a recipient");
        return false;
      }

      const messageData = {
        text: message?.text || null,
        image: message?.image || null,
        forwarded: true,
        originalSender: message?.senderName || "",
      };

      if (!messageData.text && !messageData.image) {
        toast.error("This message type cannot be forwarded yet");
        return false;
      }

      const results = await Promise.allSettled(
        uniqueReceiverIds.map((receiverId) =>
          axiosSecure.post(`/api/messages/send/${receiverId}`, messageData),
        ),
      );

      const successCount = results.filter(
        (result) => result.status === "fulfilled",
      ).length;

      if (successCount === 0) {
        toast.error("Forward failed");
        return false;
      }

      get().getMessagePartners();

      if (successCount === uniqueReceiverIds.length) {
        toast.success(
          successCount > 1
            ? `Message forwarded to ${successCount} recipients`
            : "Message forwarded",
        );
      } else {
        toast.success(`Message forwarded to ${successCount} recipients`);
        toast.error(
          `Failed for ${uniqueReceiverIds.length - successCount} recipients`,
        );
      }

      return true;
    } catch (error) {
      console.error("Forward failed", error);
      toast.error(error?.response?.data?.message || "Forward failed");
      return false;
    }
  },
}));
