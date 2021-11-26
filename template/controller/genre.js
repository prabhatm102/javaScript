const { Genres } = require("../models/genre")

const getGenres = async(req,res,next)=>{
  const genre = await Genres.find({});
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).json(genre);
}

module.exports = {
    getGenres:getGenres
}