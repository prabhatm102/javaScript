const mongoose = require("mongoose");

const Movie = mongoose.model("movies",new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:255
    },
    genres:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'genres',
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:9999999
    },
    dailyRentalRate:{
        type:Number,  
        required:true,
        min:50,
        max:99999
    }
}));


module.exports.Movie = Movie;
