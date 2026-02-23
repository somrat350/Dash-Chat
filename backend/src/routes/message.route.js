import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";

const messageRouter = express.Router();

messageRouter.get("/message", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});
