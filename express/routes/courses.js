const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses=[
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"},
    {id:4,name:"course4"},
    {id:5,name:"course5"},
];

// Fetch Courses/Data...........................
router.get("/",(req,res)=>{
    res.send(courses);
});

router.get("/:id",(req,res)=>{
    const course=courses.find(c => c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("The Requested course is not found!!!");
     
     res.send(course); 
});

// Create Courses...........................

router.post("/",(req,res)=>{
//   if(!req.body.name || req.body.name.length<3)
//      return res.status(400).send("Name is required and must be more
    const {error} = validateCourse(req.body);
         if(error) return res.status(400).send(error.details[0].message);

    const course={
        id:courses.length+1,
        name: req.body.name+(courses.length+1)
    };
    courses.push(course);
    res.send(course);
});


// Update Courses..........................

router.put("/:id",(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("Requested Course is not found.....");

    const {error} = validateCourse(req.body);
      if(error) return res.status(400).send(error.details[0].message);
         
      course.name=req.body.name;
      res.send(course);  
});


// Delete Courses................................

router.delete("/:id",(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
      if(!course) return res.status(404).send("Requested Course is not found.....");

      const index= courses.indexOf(course);
       courses.splice(index,1);
       res.send(course);
});

function validateCourse(course){
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    });

    return schema.validate(course);
}

module.exports = router;