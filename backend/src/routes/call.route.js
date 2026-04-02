import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getCalls,
  createCall,
  deleteCall,
  getStreamToken,
  ensureStreamMembers,
  updateCallStatus,
} from "../controllers/call.controller.js";

const callRouter = express.Router();

callRouter.use(isAuthenticated);

callRouter.get("/", getCalls);
callRouter.get("/token", getStreamToken);
callRouter.post("/ensure-members", ensureStreamMembers);
callRouter.post("/", createCall);
callRouter.patch("/:id/status", updateCallStatus);
callRouter.delete("/:id", deleteCall);

export default callRouter;
