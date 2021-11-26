const { allowCrossDomain } = require("../middleware/allowCrossDomain");
const validateObjectId = require("../middleware/validateObjectId");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
//const asyncMiddleware = require("../middleware/async");
const { validate } = require("../validations/genre")
const { getGenres, getGenresById, setGenre, updateGenre, deleteGenre } = require("../controllers/genre");
const express = require("express");
const router = express.Router();

  router.get("/",[allowCrossDomain,getGenres]);

  router.get("/:id",[validateObjectId,getGenresById]);

  router.post("/",[auth,validate,setGenre]);

  router.put("/:id",[validateObjectId,validate,updateGenre]);

  router.delete("/:id",[auth,admin],deleteGenre);

module.exports = router;