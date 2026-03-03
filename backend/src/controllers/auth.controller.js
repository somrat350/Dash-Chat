import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, photoURL = "", firebaseUid } = req.body;

  try {
    if (!name || !email || !firebaseUid) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const newUser = new User({
      name,
      email,
      photoURL,
      firebaseUid,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, photoURL } = req.body;

  try {
    if (!name || !photoURL) {
      return res.status(400).json({ message: "No Content" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (name) user.name = name;
    if (photoURL !== undefined) user.photoURL = photoURL;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully.", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};