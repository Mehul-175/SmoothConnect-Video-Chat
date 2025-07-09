import "./configEnv.js"
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import connectDB from "./lib/db.js";
import chatRoutes from "./routes/chat.route.js";


const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
    connectDB();
})