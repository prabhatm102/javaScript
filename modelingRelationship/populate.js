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
       ref:"Author"
   }
}));