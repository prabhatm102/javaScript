// const Joi = require("joi");
// const joiObjectId = require("joi-objectid")(Joi);
const config = require("config");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

if(!config.get("jwtPrivateKey")){
  console.error("FATAL ERROR: jwtPrivateKey is not defined!");
  process.exit(1);              // arg except 0 means unsuccessfull...
}

const mongoose = require("mongoose");
const port = process.env.PORT || 5050
const express = require("express");
const app  = new express();

 mongoose.connect("mongodb://localhost:/vidly")
   .then(()=> console.log("Connected to mongodb....."))
   .catch((err)=>console.log(err.message));
   

  app.use(express.json());
  app.use("/api/genres",genres);
  app.use("/api/customers",customers);
  app.use("/api/movies",movies);
  app.use("/api/rentals",rentals);
  app.use("/api/users",users);
  app.use("/api/logins",auth);
  app.get("/",(req,res)=>{
    res.send("Welcome To HomePage!!!");
});

app.listen(port,()=>{
   console.log(`Server  is listening at ${port}...`);
});