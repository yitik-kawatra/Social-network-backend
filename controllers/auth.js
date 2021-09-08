const User=require('../models/user');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const expressJwt=require('express-jwt');
exports.signup=async (req,res)=>{
    const userExists = await User.findOne({email:req.body.email});
    if(userExists){
        return res.status(403).json({
            error:"email already exist!"
        });
    }
    try{
        const user= await new User(req.body);
        await user.save();
        res.status(200).json({message:"Signup success!"});
    }
    catch(err){
        console.log(err);
    }
}

exports.signin=(req,res)=>{

    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{

        if(err || !user){
            return res.status(401).json({
                error:"Email or password does not match"
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email or password does not match"
            })
        }

        const token=jwt.sign({_id:user._id},process.env.JWT_KEY);

        res.cookie("t",token,{expire:new Date()+9999});
        const {_id,name,email}=user;
        return res.json({token,user:{_id,name,email}}); 
    })
}

exports.signout=(req,res)=>{
    res.clearCookie("t");
    return res.json({message:"Signout success!"});
}

exports.requireSignin=expressJwt({
    secret:process.env.JWT_KEY,
    algorithms: ['HS256'] ,
    userProperty:"auth"
})