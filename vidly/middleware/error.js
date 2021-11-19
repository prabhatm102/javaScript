const winston = require("winston");
module.exports = function (err,req,res,next){
   winston.error(err.message,err);
   // winston.log("warn",err.message);
     // error
     // warn
     // info
     // verbose
     // debug
   res.status(500).send("Somethin failed!");
};