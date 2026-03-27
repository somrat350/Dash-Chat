import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../lib/axios";

const BASE_URL = SOCKET_BASE_URL;

export const useAuthStore = create((set, get) => ({
  userLoading: true,
  profileUpdating: false,
  authUser: null,
  socket: null,
  onlineUsers: [],
  typingUsers: {},
  incomingCall: null,
  callSignal: null,
  clearIncomingCall: () => set({ incomingCall: null }),
  clearCallSignal: () => set({ callSignal: null }),

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
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to access your chats after logging out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
      });

      if (!result.isConfirmed) return false;

      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      get().disconnectSocket();
      toast.success("Logged out successful!");
      return true;
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout failed:", error);
      return false;
    }
  },
  updateProfile: async (data) => {
    try {
      set({ profileUpdating: true });
      const res = await axiosInstance.patch("/api/users/updateProfile", data);
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      set({ profileUpdating: false });
    }
  },
  //Reset Password
  resetPassword: async () => {},
  connectSocket: async () => {
    const { authUser, userLoading } = get();
    if (!authUser || userLoading || get().socket?.connected) return;
    const socket = io(BASE_URL, {
      withCredentials: true,
      auth: {
        token: authUser?.accessToken || "",
      },
      transports: ["websocket", "polling"],
    });
    socket.connect();
    socket.on("connect", () => {
      set({ socket });
    });

    console.log({ BASE_URL, socket });

    if (socket.connected) {
      toast.success("Socket connected.");
    } else {
      toast.error("Socket connection failed!");
    }

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    console.log(get().onlineUsers);

    socket.on("incomingCall", (callPayload) => {
      set({ incomingCall: callPayload });
      const callerName = callPayload?.caller?.name || "Someone";
      const medium = callPayload?.type === "video" ? "Video" : "Audio";
      toast(`${medium} call from ${callerName}`);
    });

    socket.on("callAccepted", (payload) => {
      set({
        callSignal: {
          type: "callAccepted",
          callId: payload?.callId || null,
          fromUserId: payload?.fromUserId || null,
          acceptedAt: payload?.acceptedAt || Date.now(),
          at: Date.now(),
        },
      });
    });

    socket.on("callEnded", (payload) => {
      set((state) => {
        const activeIncomingCallId = state.incomingCall?.callId;
        const endedCallId = payload?.callId || null;
        const shouldClearIncomingCall =
          !state.incomingCall ||
          !activeIncomingCallId ||
          !endedCallId ||
          activeIncomingCallId === endedCallId;

        return {
          ...state,
          incomingCall: shouldClearIncomingCall ? null : state.incomingCall,
          callSignal: {
            type: "callEnded",
            callId: endedCallId,
            fromUserId: payload?.fromUserId || null,
            reason: payload?.reason || "completed",
            duration: payload?.duration ?? null,
            at: payload?.at || Date.now(),
          },
        };
      });
    });

    socket.on("typingStatus", (payload) => {
      const fromUserId = payload?.fromUserId;
      if (!fromUserId) return;

      set((state) => ({
        typingUsers: {
          ...state.typingUsers,
          [String(fromUserId)]: Boolean(payload?.isTyping),
        },
      }));
    });
  },
  disconnectSocket: () => {
    if (!get().socket) return;
    if (get().socket?.connected) get().socket.disconnect();
    set({
      incomingCall: null,
      callSignal: null,
      typingUsers: {},
      socket: null,
    });
  },
}));
