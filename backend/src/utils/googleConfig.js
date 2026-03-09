import { google } from "googleapis";
import { ENV } from "../lib/env.js";

const GOOGLE_CLIENT_ID = ENV.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = ENV.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth credentials are missing!");
}

const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage",
);

export default oauth2client;
