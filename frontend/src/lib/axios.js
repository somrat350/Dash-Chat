import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const sanitizeBaseUrl = (url = "") => {
  const trimmed = String(url || "")
    .trim()
    .replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.endsWith("/api") ? trimmed.slice(0, -4) : trimmed;
};

const ENV_SERVER_URL = import.meta.env.VITE_SERVER_URL;
const FALLBACK_URL =
  typeof window !== "undefined" ? window.location.origin : "";
const BASE_URL = sanitizeBaseUrl(ENV_SERVER_URL || FALLBACK_URL);

export const SOCKET_BASE_URL = BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosSecure = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosSecure.interceptors.request.use((config) => {
  const { authUser } = useAuthStore.getState();
  config.headers.authorization = `Bearer ${authUser?.accessToken}`;
  return config;
});
