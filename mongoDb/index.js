const mongoose = require("mongoose");

// Connecting To database.......

mongoose.connect("mongodb://127.0.0.1/playground")
  .then(()=>console.log("Connected To MongoDb....."))
  .catch((err)=>console.error("Couldnot Connect!!!",err.message));

// Creating Schema with validators.........

const courseSchema = new mongoose.Schema({
    name:{
      type:String,
      minlength:4,
      maxlength:[10,"Name must be less than 10 letters!!! got: {VALUE}"],
      required:true,
     // match:/^at/
    },
    category:{
      type:String,
      //enum:['web','mobile','network'],
      enum:{values:['web','mobile','network'],message:"{VALUE} is not Supported"},
      required:true,
      lowercase:true,
      //uppercase:true,
      trim:true

    },
    author:String,
    tags:{
      type:Array,                                     //Custom Synchronous Validator 
        validate:{
          validator:function(v){
            return v && v.length;
          },
          message:"A course should have atleast one tag!!!"
        } 
    },
    // tags:{
    //   type:Array,
    //   validate:{                         //Async validators
    //     isAsync:true,                     // We can also make a validator async by returning a promise.e.g.:   validate: () => Promise.reject(new Error('Oops!'))
    //     validator:function(v,callback){    // There are two ways for an promise-based async validator to fail:   validate: { validator: () => Promise.resolve(false),message: 'Email validation failed' }
    //         setTimeout(()=>{                     // 1) If the promise rejects, Mongoose assumes the validator failed with the given error.
    //           const result = v && v.length>3;    // 2) If the promise resolves to `false`, Mongoose assumes the validator failed and creates an error with the given `message`.
    //           // callback(result);
    //         },2000);
    //     },
    //     message:"A course should have one tag!!!"
    //   }
    // },
    isPublished : Boolean,
    date:{
      type:Date,  
      default:Date.now,
    //   min:'2000-01-01',
    //  max:'2021-01-01'
    },
    price:{
      type:Number,
      required:function(){return this.isPublished;},
      min:100,
      max:15000,
      set :(value)=>Math.round(value),
      get :(value) =>Math.round(value)
    }

    
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
    name:"atCSS1234567",
    category:" MOBILE ",
    author: "cde",
    tags: [],
    date:'2021-01-02',
    isPublished: false,
    price:999.20
  });
  try {
     await course.validate()
    //  const result = await course.save();
    //  console.log(result);
  } catch (ex) {
    for(field in ex.errors){
      console.log(ex.errors[field].message);
    }
  }
}
//createCourse();
  // get round price......
     async function getPrice(id){
        const Course = new mongoose.model("course",courseSchema);
        const roundPrice = await Course
          .find({"_id":"618cbe727b47df6a2cebe7a7"})
          .select({price:1,_id:0});
         console.log(roundPrice);
     } 
    getPrice("618cbe727b47df6a2cebe7a7"); 

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


