import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { acceptFriendRequest, getFriends, getrecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getrecommendedUsers);
router.get("/friends", getFriends)

router.post("/friend-request:id", sendFriendRequest);
router.put("/accept-friend:id/accept", acceptFriendRequest);

export default router;