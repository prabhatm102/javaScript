const mongoose = require("mongoose");
const moment = require("moment");

const rentalSchema = new mongoose.Schema({
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
      //  required:true,
    },
    rentalFee:{
        type:Number,
        min:0
    }
});

rentalSchema.statics.lookup = function(customerId,movieId){
    return this.findOne({
       'customer._id' : customerId,
       'movie._id':movieId
    });
 }

rentalSchema.methods.return = function(){
    const rentalDays = moment().diff(this.dateOut,'days');
    this.rentalFee = rentalDays*this.movie.dailyRentalRate;
} 

const Rental = mongoose.model("rental",rentalSchema);

module.exports.Rental = Rental;
