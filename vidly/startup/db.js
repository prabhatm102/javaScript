const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function(){
   const db = config.get("db");
    mongoose.connect(db)
      .then(()=> winston.log("info",`Connected to ${db}`));
   // .catch((err)=>console.log(err.message));
}