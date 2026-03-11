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
    const loggedInUserEmail = req.decoded_email;
    const { query = "" } = req.query;
    if (!query.trim()) {
      return res.status(200).json([]);
    }
    const partners = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(partners);
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnersId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");
    res.status(200).json(chatPartners);
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
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, replyTo, forwarded, originalSender } = req.body;
    const loggedInUserId = req.user._id;
    const { userId: receiverId } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const newMessage = new Message({
      senderId: loggedInUserId,
      receiverId,
      text: text || null,
      image: image || null,
      replyTo: replyTo || null,
      forwarded: forwarded || false,
      originalSender: forwarded ? originalSender : "",
    });
    const savedMessage = await newMessage.save();

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
