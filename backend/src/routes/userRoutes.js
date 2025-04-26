import express from 'express';
import { deleteUser, getAllUsers, getSingleUser, loginUser, registerUser, updateUser } from '../controllers/userRoutes.js';
import { isAuthenticated } from '../middleware/authentication.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.put('/update/:id',updateUser);
userRouter.delete('/delete/:id',deleteUser);
userRouter.get('/alluser',getAllUsers);
userRouter.get('/singleuser/:id',getSingleUser);

export {userRouter};