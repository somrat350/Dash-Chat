import express from "express";
import { register, updateProfile } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.patch("/update-profile/:email", updateProfile);

export default authRouter;
