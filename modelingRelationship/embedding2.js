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
    authors:[authorSchema]
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

async function createCourse(name,authors){
    const course = new Course({
        name,
        authors
    });
    const result = await course.save();
    console.log(result);
}


async function addAuthor(courseId,author){
   const course = await Course.findById(courseId);
   course.authors.push(author);
   course.save();
   console.log("Author Added!");
}

async function removeAuthor(courseId,authorId){
    try{
        const course = await Course.findById(courseId);
        if(!course) return console.log("No course exists of this ID:"+courseId);
      const author = course.authors.id(authorId);
        if(!author) return console.log("No author exists of this ID:"+authorId);
    // console.log(author);
       author.remove();
       course.save();
       console.log(`Author (${author.name}) deleted!`);
    }catch(ex){
        console.log(ex.message+"   [Please provide correct id formate of 24byte...]");
    }
  
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

//   createCourse("Node Course",
//     [
//      new Author({name:"xyz",bio:"xyz bio",website:"xyz.in"}),
//      new Author({name:"abc",bio:"abc bio",website:"abc.com"}),
//      new Author({name:"pqr",bio:"pqr bio",website:"pqr.net"})
//     ]);
 
 // addAuthor("61923f145b2fb878feabe674",new Author({name:"newAuthor",bio:"jvj",website:"hjj.com"}));  
           
 removeAuthor("61923f145b2fb878feabe674","619258c7738898a0ece70d6c");


//listCourse();

    // updateAuthor("61923f145b2fb878feabe671");

