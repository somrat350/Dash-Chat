import mongoose from "mongoose";
import User from "../models/User.js";

export const sendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  //checking existing friends
  const receiver = await User.exists({ _id: receiverId });
  if (!receiver) {
    return res.status(404).json({
      message: "User Not Availavle",
    });
  }

  //block checker
  const isBlocked = await User.exists({
    _id: receiverId,
    friends: { $elemMatch: { user: senderId, status: "blocked" } },
  });

  if (isBlocked) {
    return res.status(403).json({ message: "User unavailable." });
  }

  // existed friends checker
  const alreadyExists = await User.exists({
    _id: receiverId,
    friends: { $elemMatch: { user: senderId } },
  });

  if (alreadyExists) {
    return res.status(400).json({
      message: "Request already pending or users are already friends",
    });
  }
  //pushing to receiver user
  await Promise.all([
    User.findByIdAndUpdate(receiverId, {
      $addToSet: { friends: { user: senderId, status: "pending" } },
    }),
    User.findByIdAndUpdate(senderId, {
      $addToSet: { friends: { user: receiverId, status: "pending" } },
    }),
  ]);

  res.status(200).json({
    message: "Request has been sent successfully",
  });
};

export const updateRequest = async (req, res) => {
  const { userId, friendId, action } = req.body;

  if (action === "rejected" || action === "delete") {
    await Promise.all([
      User.updateOne(
        { _id: userId },
        { $pull: { friends: { user: friendId } } },
      ),
      User.updateOne(
        { _id: friendId },
        { $pull: { friends: { user: userId } } },
      ),
    ]);
    return res
      .status(200)
      .json({ message: `Request has been ${action} successfully` });
  } else if (action === "blocked") {
    await  User.updateOne(
        { _id: userId, friends: {$elemMatch:{user: friendId}} },
        { $set: { "friends.$.status": "blocked" } },
      )
    return res.status(200).json({ message: "User has been blocked" });
  } else if (action === "accepted") {
    await Promise.all([
      User.updateOne(
        { _id: userId, friends: {$elemMatch:{user: friendId}} },
        { $set: { "friends.$.status": "accepted" } },
      ),
      User.updateOne(
        { _id: friendId, friends: {$elemMatch:{user: userId}} },
        { $set: { "friends.$.status": "accepted" } },
      ),
    ]);
    return res
      .status(200)
      .json({ message: "Friend request has been accepted" });
  } else {
    return res.status(400).json({ message: `Invalid action: "${action}".` });
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
        pipeline: [
          { $project: { name: 1, email: 1, photoURL: 1 } },
        ],
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
