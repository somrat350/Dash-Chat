import { create } from "zustand";

export const useAppearanceStore = create((set, get) => ({
  // defaults
  chatBgColor: "",
  chatBgImage: "",
  overlayOpacity: 0.3,
  fontSize: "medium",
  fontFamily: "Inter",
  enterToSend: true,
  autoDownload: false,

  // setters
  setEnterToSend: (value) => set({ enterToSend: value }),
  setBackground: (data) => set((state) => ({ ...state, ...data })),
  setFontSize: (size) => set({ fontSize: size }),
  setFontFamily: (family) => set({ fontFamily: family }),
  setAutoDownload: (value) => set({ autoDownload: value }),

  saveSettings: () => {
    const state = get();
    localStorage.setItem("chatSettings", JSON.stringify(state));
    alert("Settings saved!");
  },

  loadSettings: () => {
    const saved = localStorage.getItem("chatSettings");
    if (saved) set(JSON.parse(saved));
  },
}));