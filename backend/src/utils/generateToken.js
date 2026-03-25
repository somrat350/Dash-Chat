import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

const ALLOWED_SAME_SITE = new Set(["strict", "lax", "none"]);

export const getTokenCookieOptions = () => {
  const isProduction = ENV.NODE_ENV === "production";
  const configuredSameSite = String(ENV.SAME_SITE || "lax").toLowerCase();
  const safeSameSite = ALLOWED_SAME_SITE.has(configuredSameSite)
    ? configuredSameSite
    : "lax";

  // Cross-domain frontend/backend requires SameSite=None; Secure.
  const sameSite =
    isProduction && safeSameSite === "strict" ? "none" : safeSameSite;

  return {
    path: "/",
    httpOnly: true,
    sameSite,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: sameSite === "none" ? true : isProduction,
  };
};

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, getTokenCookieOptions());

  return token;
};

export default generateToken;
