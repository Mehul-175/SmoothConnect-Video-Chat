import express from "express";
import { protectRoute } from "../middlewares/auth.middleware";
import { getFriends, getrecommendedUsers } from "../controllers/user.controller";

const router = express.Router();

router.use(protectRoute);

router.get("/", getrecommendedUsers);
router.get("/friends", getFriends)

export default router;