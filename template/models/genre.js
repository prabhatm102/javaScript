const mongoose = require("mongoose");

const Genres = mongoose.model("genres",new mongoose.Schema({
     name:{
         type:String,
         required:true,
         minlength:3,
         maxlength:10
     }
}));

module.exports.Genres = Genres;