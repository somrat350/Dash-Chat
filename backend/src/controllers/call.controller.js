import Call from "../models/call.js";

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
