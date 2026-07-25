const jwt = require("jsonwebtoken");
const User= require("../models/User");

//middleware to protect routes
const protect = async (req,res,next)=>{
    try{
        const token = req.headers.authorization;
        if(token && token.startsWith("Bearer ")){
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");

            next();
        }else{
            res.status(401).json({message=" Not authorized,no token"});
        }
    }catch(error){
        res.status(401).json({message="Token failed",error:error.message});
    }

    };

    module.exports = {protect};