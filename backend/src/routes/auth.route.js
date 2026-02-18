import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/check", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

export default authRouter;
