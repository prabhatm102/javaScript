const mongoose = require("mongoose");


const Rental = mongoose.model("rental",new mongoose.Schema({
    customer:{
       type:new mongoose.Schema({
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
              required:true,
              min:1000000000,
              max:9999999999
          }
         }),
        required:true
    },
    movie:{
       type:new mongoose.Schema({
          title:{
              type:String,
              required:true,
              maxlength:255
          },
          dailyRentalRate:{
              type:Number,  
              required:true,
              min:50,
              max:99999
          }
         }),
        required:true
    },
    dateOut:{
        type:Date,
        default:Date.now
    },
    dateReturned:{
        type:Date,
        required:true,
    },
    rentalFee:{
        type:Number,
        min:0
    }
    
}));



module.exports.Rental = Rental;
