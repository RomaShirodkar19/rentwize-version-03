import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./db/index.js";
import authRouter from "./routes/authRoute.js";
import adminRouter from './routes/adminRoute.js';
import productRouter from './routes/productRoute.js';
dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/auth',authRouter);
app.use('/admin', adminRouter);
app.use('/products',productRouter);

connectDB();
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})