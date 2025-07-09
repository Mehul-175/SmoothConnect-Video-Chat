import FriendRequest from "../models/FriendRequest.js";
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

export const sendFriendRequest = async (req, res) => {
   try {
     const myId = req.user._id;
     const { id: receiverId } = req.params;

     if(myId === receiverId) return res.status(400).json({message: "You cannot send a friend request to yourself."});

     const receiver = await User.findById(receiverId);
     if(!receiver) return res.status(404).json({message: "User not found."});

     if(receiver.friends.includes(myId)) return res.status(400).json({message: "You are already friends with this user."});

     const existingRequest = await FriendRequest.findOne({
       $or: [
         { sender: myId, receiver: receiverId },
         { receiver: myId, sender: receiverId }
       ]
     });
     if(existingRequest) return res.status(400).json({message: "A friend request already exists between you and this user."});

     const friendRequest = await FriendRequest.create({ 
        sender: myId, 
        receiver: receiverId 
    });
     res.status(201).json({ message: "Friend request sent successfully.", friendRequest });
 
   } catch (error) {
     console.error("error in sendFriendRequest:", error);
     res.status(500).json({message: "Internal server error"});
   }
    
}

export const acceptFriendRequest = async (req, res) => {

    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);
        if(!friendRequest) return res.status(404).json({message: "Friend request not found."});

        if(friendRequest.receiver.toString() !== req.user._id) return res.status(401).json({message: "You are not authorized to accept this friend request."});

        friendRequest.status = "accepted";
        await friendRequest.save();

        await User.updateOne({ _id: friendRequest.sender }, { $push: { friends: friendRequest.receiver } });
        await User.updateOne({ _id: friendRequest.receiver }, { $push: { friends: friendRequest.sender } });

        res.status(200).json({ message: "Friend request accepted successfully." });


    } catch (error) {
        console.error("error in acceptFriendRequest:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getFriendRequest = async (req, res) => {
    try {
        const incomingReq = await FriendRequest.fin({
            receiver: req.user._id,
            status: "pending"
        }).populate("sender", "fullName profilePicture nativeLanguage learningLanguage");
        const acceptedReq = await FriendRequest.find({
            receiver: req.user._id,
            status: "accepted"
        }).populate("sender", "fullName profilePicture");

        res.status(200).json({ incomingReq, acceptedReq });
    } catch (error) {
        console.error("error in getFriendRequest:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getOutgoingFriendRequest = async (req, res) => {
    try {
        const outgoingReq = await FriendRequest.find({
            sender: req.user._id,
            status: "pending"
        }).populate("receiver", "fullName profilePicture nativeLanguage learningLanguage"); 

        res.status(200).json({ outgoingReq });    
    } catch (error) {
        console.error("error in getOutgoingFriendRequest:", error);
        res.status(500).json({message: "Internal server error"});
    }
}