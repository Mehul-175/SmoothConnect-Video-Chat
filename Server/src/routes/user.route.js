import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { acceptFriendRequest, getFriendRequest, getFriends, getOutgoingFriendRequest, getrecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.use(protectRoute);

router.get("/", getrecommendedUsers);
router.get("/friends", getFriends)

router.post("/friend-request:id", sendFriendRequest);
router.put("/accept-friend:id/accept", acceptFriendRequest);
router.get("/friend-request", getFriendRequest);
router.get("/outgoing-friend-request", getOutgoingFriendRequest);


export default router;