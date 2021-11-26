const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

const setRental = async(req,res,next)=>{
   
    const rental = await Rental.lookup(req.body.customerId,req.body.movieId); 
      if(!rental) return res.status(404).send("Rental not found!");  
    
    if(rental.dateReturned) 
      return res.status(400).send("Rental already Processed!");

    rental.dateReturned = new Date();
      await rental.save();

    rental.return();                          // set rentalFee
      await rental.save();

    await Movie.updateOne({_id:rental.movie._id},{
      $inc:{
        numberInStock:1
      }
    });

   return res.send(rental);
};

module.exports = {
  setRental:setRental
};