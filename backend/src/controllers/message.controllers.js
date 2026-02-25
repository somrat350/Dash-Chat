import Message from "../models/message";
import User from "../models/User";

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
