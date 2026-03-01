import admin from "../lib/firebase.js";
import User from "../models/User.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized - No token"));
    }

    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) {
      return next(new Error("Unauthorized - Invalid token"));
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.firebaseUid = user.firebaseUid;

    next();
  } catch (error) {
    console.log("Error in socket authentication:", error);
    next(new Error("Authentication failed"));
  }
};
