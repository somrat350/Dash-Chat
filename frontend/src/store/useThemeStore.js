import { create } from "zustand";

const savedTheme = localStorage.getItem("dash-chat-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

export const useThemeStore = create((set) => ({
  theme: savedTheme,

  setTheme: (theme) => {
    localStorage.setItem("dash-chat-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    set({ theme });
  },
}));
