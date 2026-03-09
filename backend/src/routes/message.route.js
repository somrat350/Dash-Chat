import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  deleteMessage,
  editMessage,
  getChatPartners,
  getMessagesByUserId,
  searchChatNewPartners,
  sendMessage,
} from "../controllers/message.controllers.js";

const messageRouter = express.Router();

messageRouter.use(isAuthenticated);

messageRouter.get("/searchNewPartner", searchChatNewPartners);
messageRouter.get("/messagePartners", getChatPartners);
messageRouter.get("/chats/:userId", getMessagesByUserId);
messageRouter.post("/send/:userId", sendMessage);
messageRouter.patch("/edit/:id", editMessage);
messageRouter.patch("/delete/:id", deleteMessage);

export default messageRouter;
