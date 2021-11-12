const mongoose = require("mongoose");

// Connecting To database.......

mongoose.connect("mongodb://127.0.0.1/playground")
  .then(()=>console.log("Connected To MongoDb....."))
  .catch((err)=>console.error("Couldnot Connect!!!",err.message));

// Creating Schema.........

const courseSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    author:String,
    tags:[String],
    isPublished : Boolean,
    date:{type:Date,default:Date.now}
    
});

// Creating Model........
/*
const Course = mongoose.model("course",courseSchema);

const course = new Course({
   name:"Node Js Course",
   author:"xyz",
   tage:["node","backend"],
   isPublished:true
});
*/
// Saving a Document...................

const Course = mongoose.model("course", courseSchema);
async function createCourse() {
  const course = new Course({
   // name:"CSS Course",
    author: "cde",
    tags: ["css","css3","frontend"],
    isPublished: true,
  });
  try {
     await course.validate()
    // const result = await course.save();
   // console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourse();

 //Getting/Querying Documents

// async function getCourse(){
//     const Course = new mongoose.model("course",courseSchema);
//     const courses = await Course
//       .find({author:"xyz"})
//       .limit(10)
//       .sort({name:1})               // OR name:-1
//       .select({name:1,author:1});     // OR name:0,author:0

//       console.log(courses);
// }

// getCourse();

// Comparison Operators.............
    //eq,ne ,gt,gte ,lt,lte ,in,nin
//Logical Operators........
    // and,or
// async function getCourse(){
//    const Course = new  mongoose.model("course",courseSchema);
//    const course = await Course
//        //.find({price:{$gt:10,$lt:20}})
//       // .find({price:{$in:[10,15,20]}})
//     //  .find({$and:[{author:'xyz'},{name:"Node JS Course"}]})
//       .find({$or:[{author:'xyz'},{name:"Node JS Course"}]});
//       // .select({name:1,author:1});
//      console.log(course);  
// } 
// getCourse();
 
 // Regular Expression......

//  async function getCourse(){
//    const Course = new mongoose.model("course",courseSchema);
//      const course = await Course
//       // .find({author:/^xyz/})
//      //  .find({author:/xyz$/i})
//        .find({author:/.*xyz.*/i})
//       // .count();
//      console.log(course);  
//  }

//  getCourse();

//Pagination.............

async function getCourse(){
  const pageNumber = 1;
  const pageSize = 2;
  const Course = new mongoose.model("course",courseSchema);
  const course = await Course  
    .find({author:"xyz",isPublished:"true"})
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .sort({name:-1})
    .select({name:1,tags:1});
  console.log(course); 
} 

// getCourse();


// // Updating a document--Query First
// async function updateCourse(id){
//    const Course = mongoose.model("course" ,courseSchema);
//    const course =await Course.findById(id);
//      if(!course) return console.log("No course of this id");
//     //  course.author="pqrst";
//     //  course.isPublished=true;
//     course.set({
//        author:"ijk",
//        isPublished:false
//     });
//      const result =await course.save()
//      console.log(result);
// }
// updateCourse("618cbe4bfacdb9de242fe9e4");


// // Updating a document--Update First...........................................
// async function updateCourse(id){
//   const Course = mongoose.model("course" ,courseSchema);
//   // const result =await Course.updateMany({isPublished:false},{
//   //   $set:{
//   //     author:"abc",
//   //     isPublished:true
//   //   }
//   // });
//   const result =await Course.updateOne({_id:id},{
//     $set:{
//       author:"abc",
//       isPublished:false
//     }
//   });
  
//     console.log(result);
// }
// updateCourse("618cbe727b47df6a2cebe7a7");


// Updating a document--Update First............................

async function updateCourse(id){
  const Course = mongoose.model("course","courseSchema");
  const course = await Course.findByIdAndUpdate(id,{
    $set:{
      author:"mno",
      isPublished:true
    }
  },{new:true});               //third arg is optional is not specified it will return before updated object.
     console.log(course);
}
 //updateCourse("618cbe4bfacdb9de242fe9e4");

// async function removeCourse(id){
//   const Course = mongoose.model("course",courseSchema);;
//   //  const result = await Course.deleteOne({_id:id});
//   // //  const result = await Course.deleteMany({isPublished:true});
//   //  console.log(result);
//   const course = await Course.findByIdAndRemove(id);
//   console.log(course);
// }
// removeCourse("618cbe727b47df6a2cebe7a7");


