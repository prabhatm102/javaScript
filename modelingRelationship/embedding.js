const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/modelRelationship")
   .then(()=>console.log("Connected To Mongodb..."))
   .catch((err)=>console.log(err.message));

const authorSchema = new mongoose.Schema({
    name:String,
    bio:String,
    website:String
});

const Author = mongoose.model("author",authorSchema);
const Course = mongoose.model("course",new mongoose.Schema({
    name:String,
    author:{
        type:authorSchema,
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
    const course = await Course   
      .find()
    console.log(course);
}

async function updateAuthor(courseId){
    const course = await Course.updateOne({_id:courseId},{
        $set:{
            'author.name':"author name updated"
        }
    });
    console.log(course);
}

// createAuthor("xyz","xyz bio","xyz website");
 // createCourse("Angular Course",new Author({name:"xyz",bio:"xyz bio",website:"xyz.in"}));
 listCourse();

 // updateAuthor("6192330633c18a25662649c4");