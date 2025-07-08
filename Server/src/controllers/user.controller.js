import User from "../models/User.js";

export const getrecommendedUsers = async (req, res) => {
    try {
        const currentUser = req.user;
        const currentUserId = currentUser._id;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { IsOnboarded: true }
            ]
        })

        res.status(200).json({ recommendedUsers });
    } catch (error) {
        console.error("error in getrecommendedUsers:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        .select("friends")
        .populate("friends", "fullName profilePicture nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("error in getFriends:", error);
        res.status(500).json({message: "Internal server error"});
    }
}