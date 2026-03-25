import mongoose from "mongoose";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import Notification from "../models/Notification.js"

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

    //checking existing user
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        message: "User Not Available.",
      });
    }

    // check if user is already friends
    if (receiver.friends.includes(senderId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
       status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

     await Notification.create({
      sender: senderId,
      receiver: receiverId,
      type: "friend_request",
      message: "sent you a friend request",
    });

    res.status(200).json(friendRequest);
  } catch (error) {
    console.error("Error in send friend request controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRequest = async (req, res) => {
  try {
    const { userId, friendId, action } = req.body;
    if (action === "delete") {
      await Promise.all([
        User.findByIdAndUpdate(userId, {
          $pull: { friends: friendId },
        }),
        User.findByIdAndUpdate(friendId, {
          $pull: { friends: userId },
        }),
      ]);
      await Notification.create({
      sender: userId,      
      receiver: friendId,  
      type: "unfriend",    
      message: "unfriended you",
    });

      return res
        .status(200)
        .json({ message: "Unfriended successfully" });
    }
    if (action === "rejected") {
      return res
        .status(200)
        .json({ message: "Request rejected successfully" });
    }
    if (action === "blocked") {
      await User.updateOne(
        { _id: userId, friends: friendId },
        { $pull: { friends: friendId } }
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
    return res
      .status(400)
      .json({ message: `Invalid action: "${action}".` });

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
        }
      },
      {
        $sample: { size: 8 }
      },
      {
        $project: {
          name: 1,
          photoURL: 1
        }
      }
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
      status: "pending"
    }).populate("sender", "name photoURL");

    res.status(200).json(requests);

  } catch (error) {
    console.error("Error fetching friend requests", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  friendrequest response 
 export const respondFriendRequest = async (req, res) => {

  const { requestId, action } = req.body;

  const notification = await Notification.findById(requestId);

  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }

  const request = await FriendRequest.findOne({$or: [
        { sender: notification.sender, receiver: notification.receiver },
        { sender: notification.receiver, receiver: notification.sender },
      ],});

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }    

  if (action === "accept") {

    request.status = "accepted";
    await request.save();

    await Promise.all([
      User.findByIdAndUpdate(request.sender, {
        $addToSet: { friends: request.receiver }
      }),

      User.findByIdAndUpdate(request.receiver, {
        $addToSet: { friends: request.sender }
      })
    ]);

    notification.isRead = true
    await notification.save()
    
     await Notification.create({
    sender: request.receiver,
    receiver: request.sender,
    type: "accepted",
    message: "accepted your friend request",
   });
    return res.json({ message: "Friend request accepted" });

  }

  if (action === "reject") {

    request.status = "rejected";
    await request.save();
      await Notification.create({
    sender: request.receiver,
    receiver: request.sender,
    type: "rejected",
    message: "rejected your friend request",
  });
    return res.json({ message: "Friend request rejected" });

  }

};

// notification 
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user._id,
    })
      .populate("sender", "name photoURL")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to load notifications" });
  }
};