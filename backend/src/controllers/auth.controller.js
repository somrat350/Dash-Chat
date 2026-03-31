import bcrypt from "bcryptjs";
import axios from "axios";
import User from "../models/User.js";
import generateToken, {
  getTokenCookieOptions,
} from "../utils/generateToken.js";
import oauth2client from "../utils/googleConfig.js";

export const registerWithEmailPassword = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      const accessToken = generateToken(savedUser._id, res);
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        photoURL: savedUser.photoURL,
        accessToken,
      });
    }
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginWithEmailPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid email or password" });

    const accessToken = generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      accessToken,
    });
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginWithGoogle = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${tokens.access_token}`,
    );
    const { email, name, picture } = userRes.data;
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        photoURL: picture,
      });
    }
    const accessToken = generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      accessToken,
    });
  } catch (error) {
    console.error("Google authenticate error : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// loginwithGithub 

export const loginWithGithub = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const access_token = tokenRes.data.access_token;
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const emailRes = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const primaryEmail = emailRes.data.find(e => e.primary)?.email;
    const { name, avatar_url } = userRes.data;
    let user = await User.findOne({ email: primaryEmail });

    if (!user) {
      user = await User.create({
        name,
        email: primaryEmail,
        photoURL: avatar_url,
      });
    }
    const accessToken = generateToken(user._id, res);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      accessToken,
    });
  } catch (error) {
    console.error("GitHub login error:", error);
    res.status(500).json({ message: "GitHub login failed" });
  }
};


export const logout = (_, res) => {
  res.clearCookie("token", getTokenCookieOptions());
  res.status(200).json({ message: "Logged out successfully" });
};

