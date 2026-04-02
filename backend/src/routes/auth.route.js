import express from "express";
import {
  loginWithEmailPassword,
  registerWithEmailPassword,
  logout,
  loginWithGoogle,
  loginWithGithub,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/registerWithEmailPassword", registerWithEmailPassword);
authRouter.post("/loginWithEmailPassword", loginWithEmailPassword);
authRouter.get("/loginWithGoogle", loginWithGoogle);
authRouter.get("/loginWithGithub", loginWithGithub);
authRouter.post("/logout", logout);
authRouter.get("/checkAuth", isAuthenticated, (req, res) => {
  res.status(200).json({
    ...req.user.toObject(),
    accessToken: req.cookies?.token || null,
  });
});

export default authRouter;
