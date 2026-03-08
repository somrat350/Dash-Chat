import { useImperativeHandle } from "react"
import User from "../models/User"

export const sendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body
    
    //pushing to receiver user
    await User.findByIdAndUpdate(receiverId,
        {
            $push: {
                friends: {
                    user: senderId,
                    status: 'pending'
            }}
        }
    )
    //pushing to sender
    await User.findByIdAndUpdate(senderId,
        {
            $push: {
                friends: {
                    user: senderId,
                    status: 'pending'
            }}
        }
    )

    res.status(200).json({
        message: "Request has been sent successfully"
    })


}

export const acceptRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  // for the user who accepted
  await User.updateOne(
    { _id: userId, "friends.user": friendId },
    { $set: { "friends.$.status": "accepted" } },
  );

  // for the user who sent the request
  await User.updateOne(
    { _id: friendId, "friends.user": userId },
    { $set: { "friends.$.status": "accepted" } },
  );

  res.status(200).json({ message: "Friend request accepted" });
};