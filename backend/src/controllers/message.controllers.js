import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.js";
import User from "../models/User.js";

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
    const loggedInUserEmail = req.decoded_email;
    const messages = await Message.find({
      $or: [{ sender: loggedInUserEmail }, { receiver: loggedInUserEmail }],
    });

    const chatPartnersEmail = [
      ...new Set(
        messages.map((msg) =>
          msg.sender === loggedInUserEmail ? msg.receiver : msg.sender,
        ),
      ),
    ];

    const chatPartners = await User.find({
      email: { $in: chatPartnersEmail },
    });
    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error fetching chat partners:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByEmail = async (req, res) => {
  try {
    const loggedInUserEmail = req.decoded_email;
    const { userEmail } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: loggedInUserEmail, receiver: userEmail },
        { sender: userEmail, receiver: loggedInUserEmail },
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
    const { text, image, replyTo } = req.body;
    const loggedInUserEmail = req.decoded_email;
    const { userEmail: receiverEmail } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Message content is required" });
    }

    let imageUrl;

    const newMessage = new Message({
      sender: loggedInUserEmail,
      receiver: receiverEmail,
      text: text || null,
      image: imageUrl || null,
      replyTo: replyTo || null,
    });
    const savedMessage = await newMessage.save();

    //web socket
    const receiverSocketId = getReceiverSocketId(receiverEmail);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", savedMessage);
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
