const mongoose =require('mongoose');
const {v4:uuid}=require('uuid');
const crypto = require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
   hashed_password:{
        type:String,
        required:true
    },
    salt:String,
} , { timestamps:true })

userSchema.virtual('password')
.set(function(password){
    this._password=password;
    this.salt=uuid();
    this.hashed_password=this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods={
    encryptPassword:function(password){
        if(!password){
            return  "";
        }
        try{
            return crypto
            .createHmac("sha1", this.salt)
            .update(password)
            .digest("hex");
        }
        catch(err){
             return "";
        }
    }
}
module.exports=mongoose.model("User",userSchema);