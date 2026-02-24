import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GithubAuthProvider, 
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider =new GithubAuthProvider()

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isRegistering: false,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth checking:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  registerUser: async (userData) => {
    set({ isRegistering: true });
    try {
      const res = await axiosInstance.post("/api/auth/register", userData);
      set({ authUser: res.data });
      toast.success("Account created successful!");
    } catch (error) {
      toast.error(error.response.data.message || "Registration failed");
    } finally {
      set({ isRegistering: false });
    }
  },
  loginUser: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", userData);
      set({ authUser: res.data });
      toast.success("Logged in successful!");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  loginWithGithub: async () => {
  set({ userLoading: true });
  try {
    const res = await signInWithPopup(auth, githubAuthProvider);

    if (res.user) {
      const userData = {
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        firebaseUid: res.user.uid,
      };

      await axiosInstance.post("/api/auth/register", userData);
    }

    set({ authUser: res.user });
    toast.success("Logged in successful");
  } catch (error) {
    toast.error(error.message || "Logout failed");
  } finally {
    set({ userLoading: false });
  }
},
  logoutUser: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successful!");
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
    }
  },
}));
