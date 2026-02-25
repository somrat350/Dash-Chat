import { create } from "zustand";

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


