const Fawn = require("fawn");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const { Rental } = require("../models/rental");
const { dateDiff } = require("../middleware/dateDiff");

Fawn.init("mongodb://localhost:/vidly");

const getRental = async(req,res)=>{
    res.status(200).send(await Rental
      .find({})
      .sort("-dateOut"));
};

const setRental = async (req,res)=>{
   try{
    const customer = await Customer.findById(req.body.customerId);
     if(!customer) return res.status(400).send("Please Provide Valid Customer Id...");
  
    const movie = await Movie.findById(req.body.movieId);
     if(!movie) return res.status(400).send("Please Provide Valid Movie Id...");

    const rental = new Rental({
        customer:{
            _id:customer.id,
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        },
        dateReturned:req.body.dateReturned
     });
     rental.rentalFee = dateDiff(rental.dateReturned,rental.dateOut)*movie.dailyRentalRate;
  
      await new Fawn.Task()
        .save("rentals",rental)
        .update("movies",{_id:movie._id},{
          $inc:{
             numberInStock:-1
            }
        }).run();
        res.send(rental);
  
    //  const result = await rental.save();
          // movie.numberInStock--;
          // await movie.save();
    //  res.send(result);
  
   }catch(ex){
       res.status(400).send(ex.message);
   }
};

module.exports = {
    getRental:getRental,
    setRental:setRental
};