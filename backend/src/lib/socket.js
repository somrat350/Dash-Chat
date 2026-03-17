import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware.js";
import { ENV } from "./env.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: [ENV.CLIENT_URL], credentials: true },
});

io.use(socketAuthMiddleware);

const userSocketMap = new Map();
const getUserRoom = (userId) => `user:${String(userId)}`;

const addUserSocket = (userId, socketId) => {
  const key = String(userId);
  if (!userSocketMap.has(key)) {
    userSocketMap.set(key, new Set());
  }
  userSocketMap.get(key).add(socketId);
};

const removeUserSocket = (userId, socketId) => {
  const key = String(userId);
  const socketSet = userSocketMap.get(key);
  if (!socketSet) return;

  socketSet.delete(socketId);
  if (socketSet.size === 0) {
    userSocketMap.delete(key);
  }
};

const getOnlineUserIds = () => Array.from(userSocketMap.keys());

export function getReceiverSocketId(userId) {
  const socketSet = userSocketMap.get(String(userId));
  if (!socketSet || socketSet.size === 0) return null;
  return socketSet.values().next().value;
}

export function getReceiverSocketIds(userId) {
  const socketSet = userSocketMap.get(String(userId));
  return socketSet ? Array.from(socketSet) : [];
}

export function getUserRoomName(userId) {
  return getUserRoom(userId);
}

io.on("connection", (socket) => {
  const userId = socket.userId;
  addUserSocket(userId, socket.id);
  socket.join(getUserRoom(userId));

  io.emit("getOnlineUsers", getOnlineUserIds());

  socket.on("cancelOutgoingCall", ({ toUserId, callId }) => {
    if (!toUserId) return;
    io.to(getUserRoom(toUserId)).emit("callEnded", {
      callId: callId || null,
      reason: "cancelled",
      fromUserId: userId,
      at: Date.now(),
    });
  });

  socket.on("rejectIncomingCall", ({ toUserId, callId }) => {
    if (!toUserId) return;
    io.to(getUserRoom(toUserId)).emit("callEnded", {
      callId: callId || null,
      reason: "rejected",
      fromUserId: userId,
      at: Date.now(),
    });
  });

  socket.on("acceptIncomingCall", ({ toUserId, callId }) => {
    if (!toUserId) return;
    io.to(getUserRoom(toUserId)).emit("callAccepted", {
      callId: callId || null,
      fromUserId: userId,
      acceptedAt: Date.now(),
    });
  });

  socket.on("endCallSession", ({ toUserId, callId, reason, duration }) => {
    if (!toUserId) return;
    io.to(getUserRoom(toUserId)).emit("callEnded", {
      callId: callId || null,
      reason: reason || "completed",
      duration: typeof duration === "number" ? duration : null,
      fromUserId: userId,
      at: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    removeUserSocket(userId, socket.id);
    io.emit("getOnlineUsers", getOnlineUserIds());
  });
});

export { app, server, io };
