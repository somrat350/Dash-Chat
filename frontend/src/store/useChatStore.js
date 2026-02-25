import { create } from "zustand";


import axios from "axios";

// sidebar 

export const useMessageStore = create((set) => ({
  users: [],
  loading: false,

  fetchMessagePartners: async () => {
    try {
      set({ loading: true });

      const token = localStorage.getItem("token"); 

      const res = await axios.get("/api/messages/messagePartners", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Chat partners:", res.data);

      set({ users: Array.isArray(res.data) ? res.data : [], loading: false });
    } catch (error) {
      console.error("Failed to fetch chat partners:", error);
      set({ users: [], loading: false });
    }
  },
}));

// massage input 

export const useChatStore = create((set) => ({
  
  message: "",
  setMessage: (value) => set({ message: value }),
  clearMessage: () => set({ message: "" }),

  
  showEmoji: false,
  toggleEmoji: () => set((state) => ({
     showEmoji: !state.showEmoji 
    })),

  
  showAttachment: false,
  toggleAttachment: () => set((state) => ({ 
    showAttachment: !state.showAttachment
 })),


  attachmentPreview: null,
  setAttachmentPreview: (url) => set({ attachmentPreview: url }),
  clearAttachmentPreview: () => set({ attachmentPreview: null }),

 
  attachmentType: null,
  setAttachmentType: (type) => set({
     attachmentType: type 
    }),

  
  showStickerPicker: false,
  toggleStickerPicker: () => set((state) => 
    ({ 
        showStickerPicker: !state.showStickerPicker
     })),

  showPollCreator: false,
  togglePollCreator: () => set((state) => ({ 
    showPollCreator: !state.showPollCreator 
})),

  showEventCreator: false,
  toggleEventCreator: () => set((state) => ({ 
    showEventCreator: !state.showEventCreator
 })),

}));



