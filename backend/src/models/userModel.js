import mongoose, { mongo } from 'mongoose';

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
});

export const User=mongoose.model("User",userSchema);    