import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User id required." });
    }
    const record = await User.findById(userId);
    res.status(200).json(record);
  } catch (error) {
    console.error("Single user get error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
