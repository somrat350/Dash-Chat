import User from "../models/User.js";

export const sendRequest = async (req, res) => {
  const { senderId, receiverId } = req.body;

  //checking existing friends
  const receiver = await User.findById(receiverId);

  //block checker
  const isBlocked = receiver.friends.find(
    (f) => f.user.toString() === senderId && f.status === "blocked",
  );

  if (isBlocked) {
    return res.status(403).json({ message: "User unavailable." });
  }

  // existed friends checker
  const alreadyExists = receiver.friends.find(
    (f) => f.user.toString() === senderId,
  );

  if (alreadyExists) {
    if (alreadyExists.status === "blocked") {
      return res
        .status(403)
        .json({ message: "You cannot send a request to this user." });
    }
    return res.status(400).json({
      message: "Request already pending or users are already friends",
    });
  }
  //pushing to receiver user
  await User.findByIdAndUpdate(receiverId, {
    $addToSet: {
      friends: {
        user: senderId,
        status: "pending",
      },
    },
  });
  //pushing to sender
  await User.findByIdAndUpdate(senderId, {
    $addToSet: {
      friends: {
        user: receiverId,
        status: "pending",
      },
    },
  });

  res.status(200).json({
    message: "Request has been sent successfully",
  });
};

export const updateRequest = async (req, res) => {
  const { userId, friendId, action } = req.body;

  if (action === "rejected" || action === "delete") {
    await User.updateOne(
      { _id: userId },
      { $pull: { friends: { user: friendId } } },
    );
    await User.updateOne(
      { _id: friendId },
      { $pull: { friends: { user: userId } } },
    );
    return res
      .status(200)
      .json({ message: `Request has been ${action} successfully` });
  }

  if (action === "blocked") {
    await User.updateOne(
      { _id: userId, "friends.user": friendId },
      { $set: { "friends.$.status": "blocked" } },
    );
    return res.status(200).json({ message: "User has been blocked" });
  }

  if (action === "accepted") {
    await User.updateOne(
      { _id: userId, "friends.user": friendId },
      { $set: { "friends.$.status": "accepted" } },
    );
    await User.updateOne(
      { _id: friendId, "friends.user": userId },
      { $set: { "friends.$.status": "accepted" } },
    );
    return res
      .status(200)
      .json({ message: "Friend request has been accepted" });
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
  res.status(200).json(
    {
      message: "Successfully fetched Friends list",
    },
    acceptedFriends,
  );
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
