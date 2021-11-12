const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const config=require("config");

const morgan = require("morgan");
const helmet = require("helmet");

const courses = require("./routes/courses"); 
const home = require("./routes/home");

const logger = require("./middleware/logger");
const express = require("express");
const app = express();

//Built-in Middlewares
app.use(express.json());              // for application/json
app.use(express.urlencoded({extended:true}));    // for form-encoded data
app.use(express.static("public"));   // for static files. e.g.=> 127.0.0.1:3000/readme.txt

// Template Engine
app.set("view engine","pug");
app.set("views","./views");


// Custom Middlewares
app.use(logger);
app.use(function(req,res,next){
   console.log("Authenticating.....");
   next();   
});


// Third Party Middlewares
app.use(helmet());
//app.use(morgan('combined'));

// Environment.......................

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);  // it will return undefinded when env variable will not set.
// console.log(`app:${app.get('env')}`);             // it will return development when env variable will not set.

if(app.get("env")==="development"){
    app.use(morgan('combined'));
    // console.log("Morgan Enabled........");
    startupDebugger("Morgan Enabled.........");
}

// Db work...............

dbDebugger("Connecting to the Database........");

// Configuration...............................

console.log(`Application Name:${config.get("name")}`);
console.log(`Mail Server:${config.get("mail.host")}`);
console.log(`Password:${config.get("mail.password")}`);

// Routing......................
app.use("/",home);
app.use("/api/courses",courses);

// Server...............................

const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`Server is listening at ${port}`);});
