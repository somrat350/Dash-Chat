import "dotenv/config";
import jwt from "jsonwebtoken";

const key = process.env.JWT_SECRET;

export const tokenGenarate = (user, res) => {
  const token = jwt.sign({ user }, key, {
    expiresIn: "30d",
  });
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};
