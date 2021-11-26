require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function(){
   
process.on("uncaughtException",(ex)=>{
    // console.log("WE GOT AN UNCAUGHT EXCEPTION!");
     winston.error(ex.message);
     process.exit(1);
    });
   
   // process.on("unhandledRejection",(ex)=>{
   //   // console.log("WE GOT AN UNHANDLED PROMISE");
   //    winston.error(ex);
   //    process.exit(-1);
   // });
   
   process.on("unhandledRejection",(ex)=>{  
       throw ex;
   });
   
   //winston.exceptions.unhandle(new winston.transports.File({filename:'uncaughtException.log'}));
   
   winston.add(new winston.transports.Console({colorize:true,prettyPrint:true}),new winston.transports.File({filename:'logfile.log'}));

   //  throw new Error("Something failed during startup!");

   
   // winston.add(new winston.transports.MongoDB({
   //    db:"mongodb://localhost/vidly",
   //    level:"info",          // optional
   //    options:{
   //      useUnifiedTopology:true
   //    } 
   //  }));
   
   
}