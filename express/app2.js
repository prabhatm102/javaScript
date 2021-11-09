const Joi = require("joi");

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");

const config=require("config");

const morgan = require("morgan");
const helmet = require("helmet");

const logger = require("./middleware/logger");
const express = require("express");
const app = express();

//Built-in Middlewares
app.use(express.json());              // for application/json
app.use(express.urlencoded({extended:true}));    // for form-encoded data
app.use(express.static("public"));   // for static files. e.g.=> 127.0.0.1:3000/readme.txt


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



const courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
    {id:4,name:"course4"},
    {id:5,name:"course5"},
];

// Routing......................


  // Fetch Courses/Data...........................

app.get("/",(req,res)=>{
    console.log(process.env);
    res.send("HomePage!!!");
});

app.get("/api/courses",(req,res)=>{
    res.send(courses);
});

app.get("/api/courses/:id",(req,res)=>{
    const course=courses.find(c => c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("The Requested course is not found!!!");
     
     res.send(course); 
});

// Create Courses...........................

app.post("/api/courses",(req,res)=>{
//   if(!req.body.name || req.body.name.length<3)
//      return res.status(400).send("Name is required and must be more than 2 character");
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    });
    
    const result= schema.validate(req.body);

    if(result.error){
      return  res.status(400).send(result.error.details[0].message);
    }

    const course={
        id:courses.length+1,
        name: req.body.name+(courses.length+1)
    };
    courses.push(course);
    res.send(course);
});


// Update Courses..........................

app.put("/api/courses/:id",(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("Requested Course is not found.....");

      const schema=Joi.object({
          name:Joi.string().min(3).required()
      });

      const result= schema.validate(req.body);
        if(result.error) return res.status(400).send(result.error.details[0].message);

         
      course.name=req.body.name;
      res.send(course);  
});


// Delete Courses................................

app.delete("/api/courses/:id",(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("Requested Course is not found.....");

      const index= courses.indexOf(course);
       courses.splice(index,1);
       res.send(course);
});


// Server...............................

const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`Server is listening at ${port}`);});
