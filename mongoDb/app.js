const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercise")
  .then(()=>console.log("Connected To MongoDB..."))
  .catch((err)=>console.log(err.message));
const courseSchema = new mongoose.Schema().paths;
//console.log(courseSchema);
async function getCourse(){
   const Course = mongoose.model("course",courseSchema);
   const course = await Course
     .find();

    console.log(course); 
}  

getCourse();
