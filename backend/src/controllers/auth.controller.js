import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, profilePic,role } = req.body;

  try {
    if (!name || !email) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const newUser = new User({
      name,
      email,
      profilePic,
      role,
    });

    if (newUser) {
      const savedUser = await newUser.save();

      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
        role: savedUser.role
      });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
