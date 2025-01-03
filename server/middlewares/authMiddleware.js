import JWT from "jsonwebtoken";
import User from "../models/user.model.js";

//Protected Routes token base

export const requireSignIn = async(req, res, next)=>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error.message);
        
    }
}

//admin access

export const isAdmin = async(req, res, next)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user.role !== 1)
        {
            res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "error in admin",
            error: error.message,
        })
        
    }
}