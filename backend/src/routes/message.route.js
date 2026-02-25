import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getChatPartners, sendMessage } from "../controllers/message.controllers.js";

const messageRouter = express.Router();

messageRouter.get("/", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

messageRouter.get("/messagePartners", isAuthenticated, getChatPartners);

messageRouter.post('/send/:userEmail', isAuthenticated, sendMessage)

export default messageRouter;
