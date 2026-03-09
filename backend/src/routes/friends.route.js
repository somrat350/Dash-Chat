import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  acceptedFriendRequests,
  sendRequest,
  unblockUser,
  updateRequest,
} from "../controllers/friends.controllers.js";

const friendsRouter = express.Router();

friendsRouter.use(isAuthenticated);

friendsRouter.post("/send", sendRequest);

friendsRouter.patch("/update", updateRequest);

friendsRouter.get("/accepted-friends/:id", acceptedFriendRequests);

friendsRouter.patch("/unblock", unblockUser);

export default friendsRouter;
