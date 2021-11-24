const { Genres } = require("../models/genre");

const getGenres = async (req,res,next)=>{
 // try{
   // if(!mongoose.connection.readyState) throw new Error("cant connect!");
    const genres = await Genres.find({}).sort("name");
    res.status(200).send(genres);
  // }catch(ex){
  //   next(ex);
  //  //  res.status(500).send("Something failed!"); 
  // }
   
}

const getGenresById = async (req,res,next)=>{
  const genre = await Genres.findById(req.params.id);
    if(!genre) return res.status(400).send("There is no genre of specified id");
   res.status(200).send(genre);
}

const setGenres= async (req,res,next)=>{
  //  try{
      const genre = new Genres({
         name:req.body.name
      });
    await genre.save();
    res.status(200).send(genre);
  //  }catch(ex){
  //     next(ex);
  //  // res.status(409).json(ex.message);
  //  }
}

const updateGenres = async (req,res,next)=>{
  //  try {
      const result = await Genres.updateOne({ _id:req.params.id },{
          $set: {
            name: req.body.name,
          },
        });
        if (result.matchedCount === 0)
          res.status(400).send(`There is no genres of id:${req.params.id}`);
        else if (result.matchedCount && result.modifiedCount)
          res.status(200).send(`Genres name updated to ${req.body.name}`);
        else res.status(200).send(`No Changes Detected in genres name:${req.body.name}`);
    //  }catch (ex) {
    //    next(ex);
    //  // res.status(400).send(ex.message);
    // }
}

const deleteGenres = async (req,res)=>{
  //  try{
      const result = await Genres.deleteOne({_id:req.params.id});
       if(result.deletedCount)
         res.send("Genres deleted successfully!!!");
       else  
         res.status(400).send(`There is no genre of id:${req.params.id}`);  
  //  }catch(ex){
  //     res.status(400).send(ex.message);
  //  }
}

module.exports={
     getGenres : getGenres,
     getGenresById:getGenresById,
     setGenre : setGenres,
     updateGenre : updateGenres,
     deleteGenre : deleteGenres
   };