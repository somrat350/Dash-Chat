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
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
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
    });
    const savedMessage = await newMessage.save();

    //web socket

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
