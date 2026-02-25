import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { auth } from "../lib/Firebase.config";
import toast from "react-hot-toast";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GithubAuthProvider, 
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider =new GithubAuthProvider()

export const useAuthStore = create((set) => ({
  userLoading: true,
  authUser: null,

  checkAuth: async () => {
    set({ userLoading: true });
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      set({
        authUser: currentUser,
        userLoading: false,
      });
    });

    return unsubscribe;
  },
  registerWithEP: async (userData) => {
    set({ userLoading: true });
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      if (res.user) {
        userData.firebaseUid = res.user.uid;
        await axiosInstance.post("/api/auth/register", userData);
      }
      set({ authUser: res.user });
      toast.success("Account created successful!");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      set({ userLoading: false });
    }
  },
  loginWithEP: async (userData) => {
    set({ userLoading: true });
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      set({ authUser: res.user });
      toast.success("Logged in successful!");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      set({ userLoading: false });
    }
  },
  loginWithGoogle: async () => {
    set({ userLoading: true });
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
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
      toast.success("Logged in successful!");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      set({ userLoading: false });
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
      await signOut(auth);
      set({ authUser: null });
      toast.success("Logged out successful!");
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  },
  //Reset Password
  resetPassword: async (email) => {
  set({ userLoading: true });
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Reset link sent to your email!");
  } catch (error) {
    toast.error(error.message || "Failed to send reset link");
  } finally {
    set({ userLoading: false });
  }
},
}));
