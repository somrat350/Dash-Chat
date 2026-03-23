import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/User.js";

export const recentMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    })
      .sort({ createdAt: -1 })
      .limit(12);

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const searchChatNewPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { searchText = "" } = req.query;
    if (!searchText.trim()) {
      return res.status(200).json([]);
    }
    const users = await User.find({
      _id: { $ne: loggedInUserId },
      $and: [
        {
          $or: [
            { name: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } },
            { bio: { $regex: searchText, $options: "i" } },
          ],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// optimized version
export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const partners = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
        },
      },

      {
        $addFields: {
          partnerId: {
            $cond: [
              { $eq: ["$senderId", loggedInUserId] },
              "$receiverId",
              "$senderId",
            ],
          },
        },
      },

      {
        $sort: { createdAt: -1 },
      },

      {
        $group: {
          _id: "$partnerId",
          lastMessage: { $first: "$text" },
          lastImage: { $first: "$image" },
          time: { $first: "$createdAt" },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $project: {
          _id: 0,
          user: {
            _id: "$user._id",
            name: "$user.name",
            email: "$user.email",
            photoURL: "$user.photoURL",
            lastSeen: "$user.lastSeen",
          },
          lastMessage: {
            $cond: [{ $ne: ["$lastImage", null] }, "📷 Image", "$lastMessage"],
          },
          time: 1,
        },
      },

      {
        $sort: { time: -1 },
      },
    ]);

    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userId },
        { senderId: userId, receiverId: loggedInUserId },
      ],
    }).populate("replyTo");
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {
      text,
      image,
      replyTo,
      forwarded,
      originalSender,
      messageType,
      callData,
    } = req.body;
    const loggedInUserId = req.user._id;
    const { userId: receiverId } = req.params;

    const isCallMessage = messageType === "call";

    if (!text && !image && !isCallMessage) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const newMessage = new Message({
      senderId: loggedInUserId,
      receiverId,
      text: text || null,
      image: image || null,
      messageType: isCallMessage ? "call" : "text",
      callData: isCallMessage ? callData || {} : undefined,
      replyTo: replyTo || null,
      forwarded: forwarded || false,
      originalSender: forwarded ? originalSender : "",
    });
    let savedMessage = await newMessage.save();
    savedMessage = await savedMessage.populate("replyTo");

    //web socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(loggedInUserId);

    // send to receiver
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
    }

    // send to sender
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", savedMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editedMessage = req.body;
    const updateMessage = await Message.findByIdAndUpdate(id, editedMessage, {
      new: true,
    });
    if (!updateMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updateMessage);
  } catch (error) {
    console.error("Error editing message:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { mode, userEmail } = req.body;
    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });
    let updateData = {};
    if (mode === "everyone") {
      updateData = { status: "hide", text: "This message was deleted" };
    } else if (mode === "me") {
      const hiddenFor = message.hiddenFor || [];
      if (!hiddenFor.includes(userEmail)) hiddenFor.push(userEmail);
      updateData = { hiddenFor };
    }
    const updatedMessage = await Message.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
  }
};

export const addReaction = async (req, res) => {
  try {
    const msgId = req.params.id;
    const { emoji } = req.body;
    const message = await Message.findByIdAndUpdate(
      msgId,
      { reaction: emoji },
      { new: true },
    );

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // realtime emit
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    const senderSocketId = getReceiverSocketId(message.senderId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("reactionUpdated", message);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("reactionUpdated", message);
    }

    res.status(200).json(message);
  } catch (error) {
    console.error("Reaction add error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
