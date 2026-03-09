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
    await Promise.all([
      User.updateOne(
        { _id: userId, friends: {$elemMatch:{user: friendId}} },
        { $set: { "friends.$.status": "blocked" } },
      ),
      User.updateOne(
        { _id: friendId, friends: {$elemMatch:{user: userId}} },
        { $set: { "friends.$.status": "blocked" } },
      ),
    ]);
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

export const acceptedFriendRequests = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate({
    path: "friends.user",
    match: { "friends.status": "accepted" },
    select: "name email photoURL",
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const acceptedFriends = user.friends.filter((f) => f.status === "accepted");
  res.status(200).json({
    message: "Successfully fetched Friends list",
    friends: acceptedFriends,
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
