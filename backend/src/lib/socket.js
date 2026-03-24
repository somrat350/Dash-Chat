import express from "express";
import http from "http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "../middleware/socketAuthMiddleware.js";
import { ENV } from "./env.js";
import User from "../models/User.js";
import Message from "../models/message.js";

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

const updateLastSeen = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
  } catch (error) {
    console.error("Failed to update lastSeen:", error);
  }
};

const markPendingMessagesDelivered = async (userId) => {
  try {
    const deliveredAt = new Date();
    const pendingMessages = await Message.find({
      receiverId: userId,
      deliveryStatus: "sent",
    }).select("_id senderId");

    if (pendingMessages.length === 0) return;

    await Message.updateMany(
      { _id: { $in: pendingMessages.map((message) => message._id) } },
      { $set: { deliveryStatus: "delivered", deliveredAt } },
    );

    pendingMessages.forEach((message) => {
      io.to(getUserRoom(message.senderId)).emit("messageStatusUpdated", {
        messageId: String(message._id),
        deliveryStatus: "delivered",
        deliveredAt,
        seenAt: null,
      });
    });
  } catch (error) {
    console.error("Failed to mark delivered messages:", error);
  }
};

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
  markPendingMessagesDelivered(userId);

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

  socket.on("typingStatus", ({ toUserId, isTyping }) => {
    if (!toUserId) return;

    io.to(getUserRoom(toUserId)).emit("typingStatus", {
      fromUserId: userId,
      isTyping: Boolean(isTyping),
      at: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    updateLastSeen(userId);
    removeUserSocket(userId, socket.id);
    io.emit("getOnlineUsers", getOnlineUserIds());
  });
});

export { app, server, io };
