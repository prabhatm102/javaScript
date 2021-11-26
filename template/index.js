const port = process.env.PORT | 5000;
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const mongoose = require("mongoose");
const getGenres = require("./routes/getGenres");

//app.use();
app.use("/api/genres",genres);
app.use("/getGenres",getGenres);

mongoose.connect("mongodb://localhost/vidly")
  .then(()=>console.log("Connected to mongoDB....."))
  .catch((err)=>console.log(err.message));

app.listen(port,()=>console.log(`Server is listening at ${port}`));