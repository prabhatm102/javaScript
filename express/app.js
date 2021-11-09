const Joi = require("joi");

const express = require("express");
const app = express();

app.use(express.json());

const courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
    {id:4,name:"course4"},
    {id:5,name:"course5"},
];

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

app.delete("/api/courses/:id",(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("Requested Course is not found.....");

      const index= courses.indexOf(course);
       courses.splice(index,1);
       res.send(course);
});


const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`Server is listening at ${port}`);});
