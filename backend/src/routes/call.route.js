import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  getCalls,
  createCall,
  deleteCall,
} from "../controllers/call.controller.js";

const callRouter = express.Router();

callRouter.use(isAuthenticated);

callRouter.get("/", getCalls);
callRouter.post("/", createCall);
callRouter.delete("/:id", deleteCall);

export default callRouter;
