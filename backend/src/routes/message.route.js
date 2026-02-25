import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/message", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

messageRouter.get("/messagePartners", isAuthenticated, (req, res) => {
    res.status(200).json(req.user)
});

export default messageRouter;
