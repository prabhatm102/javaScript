const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/modelRelationship")
   .then(()=>console.log("Connected To Mongodb..."))
   .catch((err)=>console.log(err.message));

const Author = mongoose.model("author",new mongoose.Schema({
    name : String,
    bio : String,
    website : String
}));

const Course = mongoose.model("course",new mongoose.Schema({
   name: String,
   author:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"author"
   }
}));

async function createAuthor(name,bio,website){
    const author = new Author({
       name,
       bio,
       website
    });
    const result = await author.save();
    console.log(result);
}

async function createCourse(name,author){
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}

async function listCourse(){
    const course =  await Course
        .find()
        .populate("author","name -_id")
      //.populate("category","name")
        .select("name author -_id");
     console.log(course);        
}

// createAuthor("xyz","xyz bio","xyz.com");
// createCourse("Node JS","619228c9157e9adb0ca6eabe");
listCourse();
