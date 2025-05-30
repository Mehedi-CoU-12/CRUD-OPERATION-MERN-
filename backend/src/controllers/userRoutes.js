import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser=async(req,res)=>{
    try {
        const {fullname,email,password}=req.body;
    
        if(!fullname || !email || !password)
            return res.status(400).json({
                message:"all field are required"
        })
    
        const user=await User.findOne({email});
    
        if(user){
            return res.status(400).json({
                message:"user already exist"
            })
        }
    
        const hashpassword=await bcrypt.hash(password,10);
    
        await User.create({
            fullname,
            email,
            password:hashpassword
        })
    
        return res.status(201).json({
            message:"user created!"
        });
    } catch (error) {
        console.log(error);
    }
}

export const loginUser=async(req,res)=>{

    const {email,password}=req.body;

    if(!email || !password)
        return res.status(400).json({
            message:"all field are required"
    });

    const user=await User.findOne({email});

    if(!user)
        return res.status(400).json({
            message:"invalid user"
    });

    const isPasswordMatched=await bcrypt.compare(password,user.password);

    if(!isPasswordMatched)
        return res.status(400).json({
            message:"invalid user or password"
    });

    const tokenData={
        userId:user._id
    };

    const token=await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});

    const cookiesOption={
        maxAge:process.env.COOKIE_EXPIRE*24*60*60*1000,
        httpOnly:true,
    }

    return res.status(200).cookie('token',token,cookiesOption).json({
        message:"user logged in"
    })
}

export const logoutUser=async(req,res)=>{
   try {
     return res.status(200).cookie('token',null,{maxAge:0}).json({
         message:"logout successfully!"
     })
   } catch (error) {
        console.log(error);
   }
}

export const deleteUser=async(req,res)=>{
    try {
        const id=req.params.id;
    
        const user=await User.findById(id);
    
        if(!user)
            return res.status(400).json({
                message:"user not found!"
            })
        
        await user.deleteOne();
    
        return res.status(200).json({
            message:"user deleted successfully!"
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateUser=async(req,res)=>{
    try {
        const{fullname,email}=req.body;
        const id=req.params.id;
    
        let newUser={};
        if(fullname)
            newUser.fullname=fullname;
    
        if(email)
            newUser.email=email;
    
        const user=await User.findByIdAndUpdate(id,newUser,{
            new:true,  
        })
    
        return res.status(200).json({
            message:"user updated successfully"
        })
    } catch (error) {
        console.log(error)
    }
}   

export const getAllUsers=async(req,res)=>{
    try {
        const allUser=await User.find();
    
        return res.status(200).json(allUser);
    } catch (error) {
        console.log(error);
    }
}

export const getSingleUser=async (req,res) => {
    try {
        const id=req.params.id;
    
        const user=await User.findOne({_id:id});
    
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}