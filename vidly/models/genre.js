const mongoose = require("mongoose");

const Genres = mongoose.model("genres",new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:10
    }
}));

module.exports.Genres = Genres;
