import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getFriends, getrecommendedUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getrecommendedUsers);
router.get("/friends", getFriends)

export default router;