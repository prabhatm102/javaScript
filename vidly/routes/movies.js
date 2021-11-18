const { getMovies, setMovie, updateMovie, deleteMovie }  = require("../controllers/movie");
const { validate } = require("../validations/movie");
const express = require("express");
const router = express.Router();

  router.get("/",getMovies);

  router.post("/",[validate,setMovie]);

  router.put("/:id",[validate,updateMovie]);

  router.delete("/:id",deleteMovie);
  
module.exports=router;