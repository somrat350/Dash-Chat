import { create } from "zustand";

export const useAppearanceStore = create((set) => ({
  chatBgColor: "",
  chatBgImage: "",
  overlayOpacity: 0.3,

  setBackground: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
