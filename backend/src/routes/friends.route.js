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
  respondFriendRequest,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
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
friendsRouter.get("/notifications", getNotifications);
friendsRouter.patch("/notifications/read-all", markAllNotificationsAsRead);
friendsRouter.patch(
  "/notifications/:notificationId/read",
  markNotificationAsRead,
);

export default friendsRouter;
