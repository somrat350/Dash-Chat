import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePrivacyStore = create(
  persist(
    (set) => ({
      blockedUsers: [],
      lastSeen: "everyone",

      blockUser: (user) =>
        set((state) => ({
          blockedUsers: [...state.blockedUsers, user],
        })),

      unblockUser: (userId) =>
        set((state) => ({
          blockedUsers: state.blockedUsers.filter(
            (u) => u._id !== userId
          ),
        })),

      setLastSeen: (value) => set({ lastSeen: value }),
    }),
    {
      name: "privacy-storage",
    }
  )
);