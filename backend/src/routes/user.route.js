import express from "express";
import {
  getNewestUsers,
  getUserById,
  updateProfile,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getNewestUsers);
userRouter.patch("/updateProfile", updateProfile);

export default userRouter;
