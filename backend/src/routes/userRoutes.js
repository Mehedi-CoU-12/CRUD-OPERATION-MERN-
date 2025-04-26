import express from 'express';
import { deleteUser, loginUser, registerUser, updateUser } from '../controllers/userRoutes.js';
import { isAuthenticated } from '../middleware/authentication.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.put('/update',isAuthenticated,updateUser);
userRouter.delete('/delete',isAuthenticated,deleteUser);

export {userRouter};