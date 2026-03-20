import "dotenv/config";
import mongoose from "mongoose";
import Call from "../models/call.js";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const cleanupOrphanCalls = async () => {
  try {
    if (!ENV.DB_URI) {
      throw new Error("DB_URI is missing");
    }

    await mongoose.connect(ENV.DB_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({}, { _id: 1 }).lean();
    const validUserIds = new Set(users.map((user) => String(user._id)));

    const calls = await Call.find(
      {},
      { _id: 1, caller: 1, receiver: 1 },
    ).lean();

    const orphanCallIds = calls
      .filter((call) => {
        const callerId = String(call.caller);
        const receiverId = String(call.receiver);
        return !validUserIds.has(callerId) || !validUserIds.has(receiverId);
      })
      .map((call) => call._id);

    if (!orphanCallIds.length) {
      console.log("No orphan calls found");
      return;
    }

    const result = await Call.deleteMany({ _id: { $in: orphanCallIds } });
    console.log(`Deleted orphan calls: ${result.deletedCount}`);
  } catch (error) {
    console.error("Cleanup failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

cleanupOrphanCalls();
