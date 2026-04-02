import express from "express";
import {
  getNewestUsers,
  getUserById,
  updateProfile,
   blockUser,
  unblockUser,
  getBlockedUsers,
} from "../controllers/user.controller.js";
// import protect from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.get("/", getNewestUsers);
userRouter.patch("/updateProfile", updateProfile);
userRouter.post("/block",  blockUser);
userRouter.post("/unblock",  unblockUser);
userRouter.get("/blocked-users",  getBlockedUsers);

export default userRouter;
