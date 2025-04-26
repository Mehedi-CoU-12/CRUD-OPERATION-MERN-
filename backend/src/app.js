import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/userRoutes.js';

const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/v1/user',userRouter);

export {app};