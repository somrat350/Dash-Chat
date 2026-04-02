import Call from "../models/call.js";
import User from "../models/User.js";
import { streamClient } from "../lib/stream.js";
import { ENV } from "../lib/env.js";
import mongoose from "mongoose";
import { getUserRoomName, io } from "../lib/socket.js";

const VALID_CALL_STATUSES = new Set([
  "ringing",
  "missed",
  "received",
  "scheduled",
  "rejected",
  "completed",
  "cancelled",
  "failed",
]);

const VALID_END_REASONS = new Set([
  "missed",
  "rejected",
  "completed",
  "cancelled",
  "connection-lost",
]);

const TERMINAL_STATUSES = new Set([
  "missed",
  "rejected",
  "completed",
  "cancelled",
  "failed",
]);

const DEFAULT_END_REASON_BY_STATUS = {
  missed: "missed",
  rejected: "rejected",
  completed: "completed",
  cancelled: "cancelled",
  failed: "connection-lost",
};

const parseOptionalDate = (value, fieldName) => {
  if (!value) return null;

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid ${fieldName}`);
  }

  return parsedDate;
};

// Get all calls for the logged-in user
export const getCalls = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 12),
    );
    const tab = String(req.query.tab || "all").toLowerCase();
    const search = String(req.query.search || "")
      .trim()
      .toLowerCase();
    const sort = String(req.query.sort || "newest").toLowerCase();
    const hasPaginationQuery =
      typeof req.query.page !== "undefined" ||
      typeof req.query.limit !== "undefined" ||
      typeof req.query.tab !== "undefined" ||
      typeof req.query.search !== "undefined" ||
      typeof req.query.sort !== "undefined";

    const calls = await Call.find({
      $or: [{ caller: userId }, { receiver: userId }],
    })
      .populate("caller", "name email photoURL")
      .populate("receiver", "name email photoURL")
      .sort({ createdAt: -1 });

    if (!hasPaginationQuery) {
      return res.status(200).json(calls);
    }

    const normalizedCalls = calls
      .map((call) => {
        const caller = call?.caller;
        const receiver = call?.receiver;

        if (!caller && !receiver) return null;

        const isIncoming =
          receiver?._id?.toString() === req.user._id?.toString();
        const otherUser =
          (isIncoming ? caller : receiver) || caller || receiver || null;

        if (!otherUser) return null;

        const isMissedForViewer =
          call.status === "missed" &&
          receiver?._id?.toString() === req.user._id?.toString();

        const callType =
          call.status === "scheduled"
            ? "scheduled"
            : isMissedForViewer
              ? "missed"
              : isIncoming
                ? "incoming"
                : "outgoing";

        return {
          call,
          callType,
          isIncoming,
          isMissedForViewer,
          otherUserName: String(otherUser?.name || "").toLowerCase(),
          createdAtMs: new Date(call.scheduledAt || call.createdAt).getTime(),
          durationSeconds: Number(call.duration) || 0,
        };
      })
      .filter(Boolean);

    const stats = normalizedCalls.reduce(
      (acc, entry) => {
        acc.total += 1;
        if (entry.callType === "incoming") acc.incoming += 1;
        if (entry.isMissedForViewer) acc.missed += 1;
        if (entry.callType === "scheduled") acc.scheduled += 1;
        return acc;
      },
      { total: 0, incoming: 0, missed: 0, scheduled: 0 },
    );

    let filteredCalls = normalizedCalls.filter((entry) => {
      const matchesTab =
        tab === "all" ||
        (tab === "missed" && entry.isMissedForViewer) ||
        (tab === "scheduled" && entry.callType === "scheduled") ||
        (tab !== "missed" && tab !== "scheduled" && entry.callType === tab);

      const matchesSearch =
        !search || entry.otherUserName.includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });

    if (sort === "oldest") {
      filteredCalls.sort((a, b) => a.createdAtMs - b.createdAtMs);
    } else if (sort === "longest") {
      filteredCalls.sort((a, b) => {
        if (b.durationSeconds !== a.durationSeconds) {
          return b.durationSeconds - a.durationSeconds;
        }
        return b.createdAtMs - a.createdAtMs;
      });
    } else {
      filteredCalls.sort((a, b) => b.createdAtMs - a.createdAtMs);
    }

    const totalItems = filteredCalls.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));
    const safePage = Math.min(page, totalPages);
    const skip = (safePage - 1) * limit;
    const pagedCalls = filteredCalls
      .slice(skip, skip + limit)
      .map((entry) => entry.call);

    res.status(200).json({
      data: pagedCalls,
      pagination: {
        page: safePage,
        limit,
        totalItems,
        totalPages,
        hasPrevPage: safePage > 1,
        hasNextPage: safePage < totalPages,
      },
      stats,
    });
  } catch (error) {
    console.error("Error fetching calls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new call record
export const createCall = async (req, res) => {
  try {
    const callerId = req.user._id;
    const { receiverId, type, status, duration, scheduledAt, streamCallId } =
      req.body;

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
      status: status || (scheduledAt ? "scheduled" : "ringing"),
      duration: duration || 0,
      scheduledAt: scheduledAt || null,
    });

    const savedCall = await newCall.save();

    const populated = await savedCall.populate([
      { path: "caller", select: "name email photoURL" },
      { path: "receiver", select: "name email photoURL" },
    ]);

    // Notify receiver in real-time so they can accept the incoming call.
    io.to(getUserRoomName(receiverId.toString())).emit("incomingCall", {
      callId: streamCallId || null,
      recordId: populated._id,
      type,
      caller: {
        _id: populated.caller?._id,
        name: populated.caller?.name || "Unknown user",
        photoURL: populated.caller?.photoURL || "",
        email: populated.caller?.email || "",
      },
      createdAt: populated.createdAt,
    });

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating call:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCallStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { status, duration, startedAt, endedAt, endReason } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid call id" });
    }

    if (!status || !VALID_CALL_STATUSES.has(status)) {
      return res.status(400).json({ message: "Invalid call status" });
    }

    if (endReason && !VALID_END_REASONS.has(endReason)) {
      return res.status(400).json({ message: "Invalid end reason" });
    }

    if (typeof duration !== "undefined") {
      const durationSeconds = Number(duration);
      if (!Number.isFinite(durationSeconds) || durationSeconds < 0) {
        return res.status(400).json({ message: "Invalid duration" });
      }
    }

    const call = await Call.findById(id);
    if (!call) {
      return res.status(404).json({ message: "Call not found" });
    }

    if (
      call.caller.toString() !== userId.toString() &&
      call.receiver.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this call" });
    }

    call.status = status;

    let parsedStartedAt = null;
    let parsedEndedAt = null;

    try {
      parsedStartedAt = parseOptionalDate(startedAt, "startedAt");
      parsedEndedAt = parseOptionalDate(endedAt, "endedAt");
    } catch (parseError) {
      return res.status(400).json({ message: parseError.message });
    }

    if (status === "received" && !call.startedAt) {
      call.startedAt = parsedStartedAt || new Date();
    } else if (parsedStartedAt) {
      call.startedAt = parsedStartedAt;
    }

    if (typeof duration !== "undefined") {
      call.duration = Math.floor(Number(duration));
    }

    if (TERMINAL_STATUSES.has(status)) {
      call.endedAt = parsedEndedAt || call.endedAt || new Date();
      call.endReason =
        endReason || DEFAULT_END_REASON_BY_STATUS[status] || null;

      if (typeof duration === "undefined" && call.startedAt && call.endedAt) {
        call.duration = Math.max(
          0,
          Math.floor(
            (call.endedAt.getTime() - call.startedAt.getTime()) / 1000,
          ),
        );
      }
    } else {
      if (parsedEndedAt) {
        call.endedAt = parsedEndedAt;
      }
      if (endReason) {
        call.endReason = endReason;
      }
    }

    await call.save();

    const populated = await call.populate([
      { path: "caller", select: "name email photoURL" },
      { path: "receiver", select: "name email photoURL" },
    ]);

    res.status(200).json(populated);
  } catch (error) {
    console.error("Error updating call status:", error);
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
