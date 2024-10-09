import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import zod from 'zod';
import {User} from '../model/user.model.js';
dotenv.config();

const authRouter = express.Router();
const registerSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    name: zod.string(),
    phoneNumber: zod.string().min(10).max(10)
});

const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
});


authRouter.post('/register', async (req, res) => {
    const { email , password , name , phoneNumber} = req.body;
    try{
        registerSchema.parse({email , password , name , phoneNumber});
    }catch(err){
        return res.status(400).json({message:"Invalid Data"});
    }

    try{
        const userExists = await User.findOne({
            email
        });
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign({email}, process.env.JWT_SECRET);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            phoneNumber
        });
        await user.save();
        return res.status(201).json({message:"User registered",token});
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"});
    }
})

authRouter.post('/login', async (req, res) => {

    const { email , password } = req.body;

    try{
        loginSchema.parse({email , password});
    }catch(err){
        return res.status(400).json({message:"Invalid Data"});
    }

    try{
        const user = await User.findOne({
            email
        });   

        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid Password"});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);

        console.log(user);

        
        return res.status(200).json({
            message: "User logged in",
            token,
            username: user.name
        });
    }catch(err){
        console.error("Server Error:", err);
        return res.status(500).json({message:"Internal Server Error"});
    }
});


export default authRouter;