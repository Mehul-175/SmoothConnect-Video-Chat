import "./configEnv.js"
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./lib/db.js";


const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
    connectDB();
})