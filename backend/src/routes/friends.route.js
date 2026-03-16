import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  acceptedFriendRequests,
  getMyFriends,
  sendRequest,
  unblockUser,
  updateRequest,
  getFriendSuggestions,
  getFriendRequests,
  respondFriendRequest
} from "../controllers/friends.controllers.js";

const friendsRouter = express.Router();

friendsRouter.use(isAuthenticated);

friendsRouter.get("/", getMyFriends);
friendsRouter.post("/send/:receiverId", sendRequest);
friendsRouter.patch("/update", updateRequest);
friendsRouter.get("/accepted-friends/:id", acceptedFriendRequests);
friendsRouter.patch("/unblock", unblockUser);
friendsRouter.get("/suggestions", getFriendSuggestions);
friendsRouter.get("/requests", getFriendRequests);
friendsRouter.post("/respond", respondFriendRequest);

export default friendsRouter;
