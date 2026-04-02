import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

export const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET,
);
