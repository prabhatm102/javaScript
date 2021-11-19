const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
//const asyncMiddleware = require("../middleware/async");

const { validate } = require("../validations/genre")
const { getGenres , setGenre , updateGenre, deleteGenre } = require("../controllers/genre");
const express = require("express");
const router = express.Router();

  router.get("/",getGenres);

  router.post("/",auth,validate,setGenre);

  router.put("/:id",validate,updateGenre);

  router.delete("/:id",[auth,admin],deleteGenre);

module.exports = router;