import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: ENV.SAME_SITE,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: ENV.NODE_ENV === "production",
  });

  return token;
};

export default generateToken;
