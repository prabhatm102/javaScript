const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function(){
    mongoose.connect("mongodb://localhost/vidly")
      .then(()=> winston.log("info","Connected to mongodb....."));
   // .catch((err)=>console.log(err.message));
}