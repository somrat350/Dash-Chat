import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  deleteMessage,
  editMessage,
  getChatPartners,
  getMessagesByUserId,
  recentMessages,
  searchChatNewPartners,
  sendMessage,
} from "../controllers/message.controllers.js";

const messageRouter = express.Router();

messageRouter.use(isAuthenticated);

messageRouter.get("/recentMessages", recentMessages);
messageRouter.get("/searchNewPartner", searchChatNewPartners);
messageRouter.get("/messagePartners", getChatPartners);
messageRouter.get("/chats/:userEmail", getMessagesByEmail);
messageRouter.post("/send/:userEmail", sendMessage);
messageRouter.patch("/edit/:id", editMessage);
messageRouter.patch("/delete/:id", deleteMessage);

export default messageRouter;
