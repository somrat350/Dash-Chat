import { ENV } from "../lib/env.js";
import { tokenGenerate } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, photoURL = "", firebaseUid } = req.body;

  try {
    if (!name || !email || !firebaseUid) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    //hashed pass
    const hashedPass = bcrypt.hashSync(password, 10);

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All Fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid email or password",
      });

    const isPassOk = await bcrypt.compare(password, user.password);
    if (!isPassOk) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //token generation
    tokenGenerate(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    sameSite: ENV.SAME_SITE,
    secure: ENV.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
