import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const getTokenFromCookieHeader = (cookieHeader = "") => {
  if (!cookieHeader) return "";

  const tokenCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((row) => row.startsWith("token="));

  if (!tokenCookie) return "";
  return decodeURIComponent(tokenCookie.split("=").slice(1).join("="));
};

const getTokenFromAuthorizationHeader = (authorizationHeader = "") => {
  if (!authorizationHeader?.startsWith("Bearer ")) return "";
  return authorizationHeader.slice(7).trim();
};

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Support both cookie-based auth and explicit auth token payload.
    const cookieToken = getTokenFromCookieHeader(
      socket.handshake.headers.cookie,
    );
    const authPayloadToken = socket.handshake.auth?.token || "";
    const authHeaderToken = getTokenFromAuthorizationHeader(
      socket.handshake.headers.authorization,
    );
    const token = cookieToken || authPayloadToken || authHeaderToken;

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    // verify the token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    // find the user from db
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    // attach user info to socket
    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
