const mongoose = require("mongoose");

const Customer = mongoose.model("customers",new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:255
    },
    isGold:{
        type:Boolean,
        required:true,
        default:false
    },
    phone:{
        type:Number,
        unique:true,
        required:true,
        min:1000000000,
        max:9999999999
    }
}));

module.exports.Customer = Customer;