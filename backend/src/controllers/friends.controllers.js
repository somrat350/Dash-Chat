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