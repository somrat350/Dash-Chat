import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7).trim()
      : "";
    const token = req.cookies.token || bearerToken;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided!" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token!" });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found!" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error is isAuthenticated middleware", error);
    return res.status(500).json({ message: "Internal server  error!" });
  }
};
