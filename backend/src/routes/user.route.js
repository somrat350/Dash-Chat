import express from "express";
import { getUserById } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserById);

export default userRouter;
