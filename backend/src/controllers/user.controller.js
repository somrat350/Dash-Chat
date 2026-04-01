import User from "../models/User.js";





export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User id required." });
    }
    const record = await User.findById(userId);
    res.status(200).json(record);
  } catch (error) {
    console.error("Single user get error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getNewestUsers = async (req, res) => {
  try {
    const newestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(12)
      .select("-password");
    res.status(200).json(newestUsers);
  } catch (error) {
    console.error("Single user get error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, photoURL } = req.body;
    const loggedInUserId = req.user._id;

    if (!name && !photoURL) {
      return res
        .status(400)
        .json({ message: "Minimum one field are required." });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (photoURL) updateData.photoURL = photoURL;

    const user = await User.findByIdAndUpdate(loggedInUserId, updateData, {
      new: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in user update:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// block add

export const blockUser = async (req, res) => {
  const { userIdToBlock } = req.body;
  const myId = req.user.id;

  try {
    await User.findByIdAndUpdate(myId, {
      $addToSet: { blockedUsers: userIdToBlock },
    });

    await User.findByIdAndUpdate(userIdToBlock, {
      $addToSet: { blockedBy: myId },
    });

    res.json({ message: "User blocked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const unblockUser = async (req, res) => {
  const { userIdToUnblock } = req.body;
  const myId = req.user.id;

  try {
    await User.findByIdAndUpdate(myId, {
      $pull: { blockedUsers: userIdToUnblock },
    });

    await User.findByIdAndUpdate(userIdToUnblock, {
      $pull: { blockedBy: myId },
    });

    res.json({ message: "User unblocked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBlockedUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "blockedUsers",
      "name email photoURL"
    );

    res.json(user.blockedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
