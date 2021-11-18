const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        minlength:5,
        maxlength:255,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        maxlength:255
    },
    isAdmin:Boolean
 });

 userSchema.methods.genrateAuthToken = function(){
     const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get("jwtPrivateKey"));
     return token;
 }

const User = mongoose.model("users",userSchema);

module.exports.User = User;
