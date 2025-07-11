import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { email, password, fullName } = req.body;
    
    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length<6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "Email already exists, please try another one."});
        }
        
        const idx = Math.floor(Math.random()*100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePicture: randomAvatar
        })

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName, 
                image: newUser.profilePicture || ""
            });
            console.log(`Stream user created for ${newUser.fullName}`);            
        } catch (error) {
            console.error("Error Creating Stream user:", error);            
        }

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        if(!email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message: "Invalid credentials"});

    const isPasswordCorrect = await user.matchesPassword(password);
    if(!isPasswordCorrect) return res.status(401).json({message: "Invalid credentials"});

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: user
        });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({message: "Logout successful"});
}

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;
        if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location){
            return res.status(400).json({
                message: "All fields are required",
                missingFields: ["fullName", "bio", "nativeLanguage", "learningLanguage", "location"].filter(field => !req.body[field])
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            fullName,
            bio,
            nativeLanguage,
            learningLanguage,
            location,
            IsOnboarded: true
        }, {new: true});
        if(!updatedUser) res.statue(404).json({message: "User not found"});
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName, 
                image: updatedUser.profilePicture || ""
            })
            console.log(`Stream user updated for ${updatedUser.fullName}`);
        } catch (streamError) {
            console.error("Error updating Stream user:", streamError.message);
            
        }
        res.status(200).json({
            success: true,
            message: "User onboarded successfully",
            user: updatedUser
        })
    } catch (error) {
        console.error("Error onboarding user:", error);
        res.status(500).json({message: "Internal server error"});
    }
}