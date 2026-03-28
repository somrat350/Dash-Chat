import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  addReaction,
  deleteMessage,
  editMessage,
  getChatPartners,
  getMessagesByUserId,
  markMessagesAsSeen,
  recentMessages,
  removeReaction,
  searchChatNewPartners,
  sendMessage,
} from "../controllers/message.controllers.js";

const messageRouter = express.Router();

messageRouter.use(isAuthenticated);

messageRouter.get("/recentMessages", recentMessages);
messageRouter.get("/searchNewPartner", searchChatNewPartners);
messageRouter.get("/messagePartners", getChatPartners);
messageRouter.get("/chats/:userId", getMessagesByUserId);
messageRouter.patch("/chats/:userId/seen", markMessagesAsSeen);
messageRouter.post("/send/:userId", sendMessage);
messageRouter.patch("/edit/:id", editMessage);
messageRouter.patch("/delete/:id", deleteMessage);

messageRouter.patch("/:id/addReaction", addReaction);
messageRouter.patch("/:id/removeReaction", removeReaction);

export default messageRouter;
