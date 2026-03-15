import Call from "../models/call.js";
import User from "../models/User.js";
import { streamClient } from "../lib/stream.js";
import { ENV } from "../lib/env.js";
import mongoose from "mongoose";

// Get all calls for the logged-in user
export const getCalls = async (req, res) => {
  try {
    const userId = req.user._id;

    const calls = await Call.find({
      $or: [{ caller: userId }, { receiver: userId }],
    })
      .populate("caller", "name email photoURL")
      .populate("receiver", "name email photoURL")
      .sort({ createdAt: -1 });

    res.status(200).json(calls);
  } catch (error) {
    console.error("Error fetching calls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new call record
export const createCall = async (req, res) => {
  try {
    const callerId = req.user._id;
    const { receiverId, type, status, duration, scheduledAt } = req.body;

    if (!receiverId || !type) {
      return res
        .status(400)
        .json({ message: "receiverId and type are required." });
    }

    if (!mongoose.isValidObjectId(receiverId)) {
      return res.status(400).json({ message: "Invalid receiverId" });
    }

    if (callerId.toString() === receiverId.toString()) {
      return res.status(400).json({ message: "Cannot call yourself" });
    }

    const receiver = await User.findById(receiverId).select("_id");
    if (!receiver) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    const newCall = new Call({
      caller: callerId,
      receiver: receiverId,
      type,
      status: status || "missed",
      duration: duration || 0,
      scheduledAt: scheduledAt || null,
    });

    const savedCall = await newCall.save();

    const populated = await savedCall.populate([
      { path: "caller", select: "name email photoURL" },
      { path: "receiver", select: "name email photoURL" },
    ]);

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating call:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a call record
export const deleteCall = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const call = await Call.findById(id);
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }

    // Only caller or receiver can delete
    if (
      call.caller.toString() !== userId.toString() &&
      call.receiver.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this call" });
    }

    await Call.findByIdAndDelete(id);
    res.status(200).json({ message: "Call deleted successfully" });
  } catch (error) {
    console.error("Error deleting call:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Generate Stream token for the logged-in user and register them in Stream
export const getStreamToken = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id.toString();

    if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
      return res
        .status(500)
        .json({ message: "Stream credentials are missing" });
    }

    // Register/update the user in Stream so they can participate in calls
    await streamClient.upsertUser({
      id: userId,
      name: user.name,
      image: user.photoURL || "",
    });

    const token =
      typeof streamClient.createToken === "function"
        ? streamClient.createToken(userId)
        : streamClient.createUserToken(userId);

    res.status(200).json({
      token,
      apiKey: ENV.STREAM_API_KEY,
      user: {
        id: userId,
        name: user.name,
        image: user.photoURL || "",
      },
    });
  } catch (error) {
    console.error("Error generating stream token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Ensure both caller and receiver exist in Stream before creating a call
export const ensureStreamMembers = async (req, res) => {
  try {
    const callerId = req.user._id.toString();
    const { receiverId } = req.body;

    if (!receiverId || !mongoose.isValidObjectId(receiverId)) {
      return res.status(400).json({ message: "Invalid receiverId" });
    }

    const receiver = await User.findById(receiverId).select("name photoURL");
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Upsert both users into Stream so they can join a call
    await streamClient.upsertUsers([
      {
        id: callerId,
        name: req.user.name,
        image: req.user.photoURL || "",
      },
      {
        id: receiver._id.toString(),
        name: receiver.name,
        image: receiver.photoURL || "",
      },
    ]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error ensuring stream members:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
