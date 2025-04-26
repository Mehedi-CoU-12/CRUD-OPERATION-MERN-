import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';

const isAuthenticated=async (req,res,next) => {
    
    try {
        const s=req.headers.cookie;  //output(s->'token=mehediahsdfk')
        const token=s.split('=')[1];
    
        if(!token)
            return res.status(400).json({
                message:"please login to access this resource"
        });
    
        const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decodedToken.userId);
    
        if(!user)
            return res.status(400).json({
                message:"please login to access this resource"
        });
    
        req.user=user;
        next();
        
    } catch (error) {
        console.log(error);
    }
}

export {isAuthenticated};