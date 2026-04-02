import mongoose from "mongoose";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import Notification from "../models/Notification.js";
import { io, getUserRoomName } from "../lib/socket.js";

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate("friends", "name photoURL bio");

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const sendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    // prevent sending req to yourself
    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You can't send friend request to yourself" });
    }

    // check if user is already friends
    if (req.user.friends.includes(receiverId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // checking existing request
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "Request already exist.",
      });
    }

    //checking existing user
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        message: "User Not Available.",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    const notification = await Notification.create({
      sender: senderId,
      receiver: receiverId,
      type: "friend_request",
      message: "sent you a friend request",
    });

    // 🔥 populate sender info
    const fullNotification = await notification.populate(
      "sender",
      "name photoURL",
    );

    // 🔥 REAL-TIME SEND
    io.to(getUserRoomName(receiverId)).emit(
      "newNotification",
      fullNotification,
    );

    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("Error in send friend request controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendId, action } = req.body;
    if (action === "unfriend") {
      await Promise.all([
        User.findByIdAndUpdate(userId, {
          $pull: { friends: friendId },
        }),
        User.findByIdAndUpdate(friendId, {
          $pull: { friends: userId },
        }),
      ]);
      const notification = await Notification.create({
        sender: userId,
        receiver: friendId,
        type: "unfriend",
        message: "unfriended you",
      });

      // 🔥 populate sender info
      const fullNotification = await notification.populate(
        "sender",
        "name photoURL",
      );

      // 🔥 REAL-TIME SEND
      io.to(getUserRoomName(friendId)).emit(
        "newNotification",
        fullNotification,
      );

      return res.status(200).json({ message: "Unfriended successfully" });
    }
    if (action === "rejected") {
      return res.status(200).json({ message: "Request rejected successfully" });
    }
    if (action === "blocked") {
      await User.updateOne(
        { _id: userId, friends: friendId },
        { $pull: { friends: friendId } },
      );

      return res.status(200).json({ message: "User has been blocked" });
    }
    if (action === "accepted") {
      await Promise.all([
        User.findByIdAndUpdate(userId, {
          $addToSet: { friends: friendId },
        }),
        User.findByIdAndUpdate(friendId, {
          $addToSet: { friends: userId },
        }),
      ]);

      return res
        .status(200)
        .json({ message: "Friend request has been accepted" });
    }
    return res.status(400).json({ message: `Invalid action: "${action}".` });
  } catch (error) {
    console.error("Error in updateRequest:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

///scaled with ai , need to work no this in the feature
export const acceptedFriendRequests = async (req, res) => {
  const { userId } = req.params;

  // Check user exists before running the aggregation
  const userExists = await User.exists({ _id: userId });
  if (!userExists) {
    return res.status(404).json({ message: "User not found." });
  }

  const friends = await User.aggregate([
    // 1. Match only the requesting user
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },

    // 2. Deconstruct the friends array into individual documents
    { $unwind: "$friends" },

    // 3. Filter to only "accepted" entries
    { $match: { "friends.status": "accepted" } },

    // 4. Join the friend's user document for profile details
    {
      $lookup: {
        from: "users", // the underlying collection name for User model
        localField: "friends.user",

        foreignField: "_id",
        as: "friends.userDetails",
        pipeline: [{ $project: { name: 1, email: 1, photoURL: 1 } }],
      },
    },

    // 5. Flatten lookup result from array → single object
    {
      $addFields: {
        "friends.userDetails": { $arrayElemAt: ["$friends.userDetails", 0] },
      },
    },

    // 6. Return only the friend subdoc as the root shape
    { $replaceRoot: { newRoot: "$friends" } },
  ]);

  res.status(200).json({
    message: "Successfully fetched Friends list",
    friends,
  });
};

export const unblockUser = async (req, res) => {
  const { userId, friendId } = req.body;

  const result = await User.updateOne(
    { _id: userId },
    { $pull: { friends: { user: friendId, status: "blocked" } } },
  );

  if (result.modifiedCount === 0) {
    return res
      .status(404)
      .json({ message: "User was not in your blocked list." });
  }

  res.status(200).json({ message: "User unblocked successfully." });
};

// freind suggetion

export const getFriendSuggestions = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(currentUserId) },
          friends: { $ne: currentUserId },
        },
      },
      {
        $sample: { size: 8 },
      },
      {
        $project: {
          name: 1,
          photoURL: 1,
        },
      },
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching suggestions", error);
    res.status(500).json({ message: "Server error" });
  }
};
// friend request
export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await FriendRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name photoURL");

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching friend requests", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  friend request response
export const respondFriendRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body;

    if (!["accepted", "rejected"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Find friend request
    const request = await FriendRequest.findById(requestId);

    if (!request)
      return res.status(404).json({ message: "Friend request not found" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "Already responded" });

    const senderId = request.sender;
    const receiverId = request.receiver;

    // If ACCEPT → add friends
    if (action === "accepted") {
      await Promise.all([
        User.findByIdAndUpdate(senderId, {
          $addToSet: { friends: receiverId },
        }),
        User.findByIdAndUpdate(receiverId, {
          $addToSet: { friends: senderId },
        }),
      ]);
    }

    // Create NEW notification for sender
    const newNotification = await Notification.create({
      sender: receiverId,
      receiver: senderId,
      type: action,
      message: `${action} your friend request`,
    });

    const populatedNewNotification = await newNotification.populate(
      "sender",
      "name photoURL",
    );

    // Delete friend request
    await FriendRequest.deleteOne({ _id: request._id });

    // Real-time emit to sender
    io.to(getUserRoomName(senderId)).emit(
      "newNotification",
      populatedNewNotification,
    );

    // Send updated notification back to receiver UI
    return res.status(200).json({ message: "Success." });
  } catch (error) {
    console.error("Respond Friend Request Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// notification
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [notifications, totalCount, unreadCount, todayCount] =
      await Promise.all([
        Notification.find({ receiver: userId })
          .populate("sender", "name photoURL")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),

        Notification.countDocuments({ receiver: userId }),
        Notification.countDocuments({ receiver: userId, isRead: false }),
        Notification.countDocuments({
          receiver: userId,
          createdAt: { $gte: startOfToday },
        }),
      ]);

    res.status(200).json({
      notifications,
      totalCount,
      unreadCount,
      todayCount,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to load notifications" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        receiver: req.user._id,
      },
      { $set: { isRead: true } },
      { new: true },
    ).populate("sender", "name photoURL");

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Failed to mark notification as read", error);
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        receiver: req.user._id,
        isRead: false,
      },
      { $set: { isRead: true } },
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Failed to mark all notifications as read", error);
    res
      .status(500)
      .json({ message: "Failed to mark all notifications as read" });
  }
};
