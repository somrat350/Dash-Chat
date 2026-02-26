import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getChatPartners,
  getMessagesByEmail,
  sendMessage,
} from "../controllers/message.controllers.js";

const messageRouter = express.Router();

messageRouter.use(isAuthenticated);

messageRouter.get("/messagePartners", getChatPartners);
messageRouter.get("/chats/:userEmail", getMessagesByEmail);
messageRouter.post("/send/:userEmail", sendMessage);

messageRouter.get("/messagePartners", isAuthenticated, getChatPartners);

messageRouter.post("/send/:userEmail", isAuthenticated, sendMessage);

export default messageRouter;
