const user=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

// generate jwt token
const generateToken = (userId)=>{
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    };
    
    //@desc register user
    //@route POST /api/auth/register
    //@access public

    const registerUser=async (req,res)=>{
        try{
            const {name,email,password,profileImageUrl}=req.body;
            //check if user already exists
            const userExists=await user.findOne({email});
            if(userExists){
                return res.status(400).json({message:"User already exists"});
               
            }
            // hash password
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            
            //create user
            const user=new user({
                name,
                email,
                password:hashedPassword,
                profileImageUrl,
            });
            
            //return user data with jwt
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                profileImageUrl:user.profileImageUrl,
                token:generateToken(user._id),
            });
        }catch(error){
            res.status(500).json({message:"server error",error:error.message});

        }
    };
     
    //@desc login user
    //@route POST /api/auth/login
    //@access public

    const loginUser=async (req,res)=>{};

    //@desc get user profile
    //@route GET /api/auth/profile
    //@access private

    const getUserProfile=async (req,res)=>{};

    module.exports = {registerUser,loginUser,getUserProfile};