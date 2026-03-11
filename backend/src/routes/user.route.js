import express from "express";
import { getNewestUsers, getUserById } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getNewestUsers);

export default userRouter;
