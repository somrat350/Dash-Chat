import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

axiosSecure.interceptors.request.use((config) => {
  const { authUser } = useAuthStore.getState();
  config.headers.authorization = `Bearer ${authUser?.accessToken}`;
  return config;
});
