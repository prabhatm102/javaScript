const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercise")
  .then(()=>console.log("Connected To MongoDB..."))
  .catch((err)=>console.log(err.message));
// const courseSchema =new mongoose.Schema();
const courseSchema = new mongoose.Schema({
  name:String,
  author:String,
  tags:[String],
  isPublished : Boolean,
  date:{type:Date,default:Date.now},
  price:{
    type:Number,
    required:function(){return this.isPublished;}
  },
  title:{
    type:String,
    required:true
  }
  
});
//console.log(courseSchema);
async function getCourse(){
const Course = mongoose.model("course",courseSchema);
   const course = await Course
    //  .find({$and:[{isPublished:true},{tags:"backend"}]})   // will return all published backend courses
    //  .sort({name:1})                             // sort by name
    //  .select('name author');                      // select only name and author

      // .find({$and:[{isPublished:true},{$or:[{tags:"backend"},{tags:"frontend"}]}]})  // get all published fromtend and backend courses
      // .sort({price:-1})                                               // sort in descending according to price
      // .select({name:1,author:1,price:1});                                            // select only name,author and price

          .find({$and:[{isPublished:true},{$or:[{price:{$gte:500}},{title:/.*by.*/i}]}]})  // return all published courses which are greater than or equal to 500 or having by in thier title.
          .select("name title price");

    console.log(course);    
}  

getCourse();
