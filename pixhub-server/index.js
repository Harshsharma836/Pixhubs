import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary }  from "cloudinary";
dotenv.config();

import connectDB from './config/db.js'
import userRouter from './routes/users.js';
import postRouter from './routes/posts.js';
import commentRouter from './routes/comments.js';
import likeRouter from './routes/likes.js';
import authRouter from './routes/auth.js';

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
})

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the Social Media Server")
})

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/likes', likeRouter);
app.use('/api/comments', commentRouter);
app.use('/api/auth', authRouter);

app.get("/get-signature", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp
      },
      cloudinaryConfig.api_secret
    )
    res.json({ timestamp, signature })
})

function startServer(){ 
    app.listen(process.env.PORT, async () => {
        await connectDB();
        console.log('Listening to PORT', process.env.PORT);
    })
}
startServer();