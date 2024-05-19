const User = require("../models/userModel");
const bcrypt=require("bcryptjs");
const generateToken= require("../utils/generateToken")

const login=async(req,res,next)=>{
    try{
        const {username,password}=req.body;
       
        const user= await User.findOne({username});
        
        const isPassword= await bcrypt.compare(password,user?.password || "");
        if(!user || !isPassword){
            
            return res.status(400).json({message:"Invalid username or password"});
        }
        const token=generateToken(user._id,res);

        res.status(200).json({success: true,token,user:{
            _id: user._id,
            username:user.username
        }})
    }
    catch(error){
        console.log("Error in login contoller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

const signup=async (req,res)=>{
    try{
    const {username,password,confirmPassword}=req.body;
    if(password !==confirmPassword){
        return res.status(400).json({message:"Password didn't match"});
    }

    const user= await User.findOne({username});

    if(user){
        return res.status(400).json({message:"UserName already exist"})
    }

    const salt= await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt);

    const newUser= new User({
        username,
        password:hashPassword
    })

    if(newUser){
    const token= generateToken(newUser._id,res);
    await newUser.save();

    res.status(201).json({success: true,token,user:{
        _id: newUser._id,
        username:newUser.username
    }})
    }
    else{
        res.status(400).json({message:"Invalid user data"})
    }
    }
    catch(error){
        console.log("Error in signup contoller",error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}

const logout=(req,res)=>{
try{
    res.cookie("jwt","",{maxAge:0 })
    res.status(200).json({message:"Logout Succesfully"})
}
catch(error){
    console.log("Error in logout contoller",error.message);
    res.status(500).json({error:"Internal Server Error"})
}
}

module.exports ={login,signup,logout}

