import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = create((set, get) => ({
  userLoading: true,
  authUser: null,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ userLoading: true });
    try {
      const res = await axiosInstance.get("/api/auth/checkAuth");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in auth checking:", error);
      set({ authUser: null });
    } finally {
      set({ userLoading: false });
    }
  },
  registerWithEP: async (userData) => {
    set({ userLoading: true });
    try {
      const res = await axiosInstance.post(
        "/api/auth/registerWithEmailPassword",
        userData,
      );
      set({ authUser: res.data });
      get().connectSocket();
      toast.success("Account created successful!");
    } catch (error) {
      set({ authUser: null });
      toast.error(error.message || "Registration failed");
    } finally {
      set({ userLoading: false });
    }
  },
  loginWithEP: async (userData) => {
    set({ userLoading: true });
    try {
      const res = await axiosInstance.post(
        "/api/auth/loginWithEmailPassword",
        userData,
      );
      set({ authUser: res.data });
      toast.success("Logged in successful!");
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      toast.error(error.response.data.message || "Login failed");
    } finally {
      set({ userLoading: false });
    }
  },
  loginWithGoogle: async (code) => {
    set({ userLoading: true });
    try {
      const res = await axiosInstance.get(
        `/api/auth/loginWithGoogle?code=${code}`,
      );
      set({ authUser: res.data });
      toast.success("Logged in successful!");
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      toast.error("Google login failed.");
      console.error("Google login error:", error);
    } finally {
      set({ userLoading: false });
    }
  },
  loginWithGithub: async () => {},
  logoutUser: async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to access your chats after logging out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosInstance.post("/api/auth/logout");
          set({ authUser: null });
          get().disconnectSocket();
          toast.success("Logged out successful!");
        }
      });
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
    }
  },
  //Reset Password
  resetPassword: async () => {},
  connectSocket: async () => {
    const { authUser, userLoading } = get();
    if (!authUser || userLoading || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    socket.connect();
    socket.on("connect", () => {
      set({ socket });
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (!get().socket) return;
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
