import express from "express";
import { register} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.get("/check", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

export default authRouter;
