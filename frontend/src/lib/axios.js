import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

axiosSecure.interceptors.request.use((config) => {
  const { authUser } = useAuthStore.getState();
  config.headers.authorization = `Bearer ${authUser?.accessToken}`;
  return config;
});
