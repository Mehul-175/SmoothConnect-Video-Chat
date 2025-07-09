import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/token", getStreamToken);

export default router;