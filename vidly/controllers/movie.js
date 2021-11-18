const { Movie } = require("../models/movie");

const getMovies = async (req,res)=>{
    res.status(200).send(await Movie
        .find({})
        .populate("genres","name -_id")
        .select("-_id title numberInStock dailyRentalRate genres"));
}

const setMovie = async(req,res)=>{
   try{
     const movie = new Movie({
         title:req.body.title,
         genres:req.body.id,
         numberInStock:req.body.numberInStock,
         dailyRentalRate:req.body.dailyRentalRate
      });
 
      await movie.save();
      res.status(200).send(movie);
   
    }catch(ex){
       res.status(400).send(ex.message);
    }
}

const updateMovie = async(req,res)=>{
    try {
        const result = await Movie.updateOne(
          { _id: req.params.id },
          {
            $set: {
              title:req.body.title,
              genres:req.body.id,
              numberInStock:req.body.numberInStock,
              dailyRentalRate:req.body.dailyRentalRate
            },
          }
        );
        if (result.matchedCount === 0)
          res.status(400).send(`There is no movie of id:${req.params.id}`);
        else if (result.matchedCount && result.modifiedCount)
          res.send(`movie info updated`);
        else res.send("No Changes Detected in movie info");
      }catch (ex) {
        res.status(400).send("Please Provide valid movie id!!!"+ex.message);
      }
}

const deleteMovie = async(req,res)=>{
    try{
        const result = await Movie.deleteOne({_id:req.params.id});
        if(result.deletedCount)
           res.status(200).send("Movie deleted successfully!!!");
         else  
           res.status(400).send(`There is no movie of id:${req.params.id}`);
    }catch(ex){
       res.status(400).send(ex.message);
    }
}
module.exports = {
   getMovies:getMovies,
   setMovie:setMovie,
   updateMovie:updateMovie,
   deleteMovie:deleteMovie
};