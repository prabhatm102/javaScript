const { validate } = require("../validations/rental");
const { setRental, getRental } = require("../controllers/rental");
const express = require("express");
const router = express.Router();


  router.get("/",getRental);

  router.post("/",[validate,setRental]);

  // router.put("/:id", async (req, res) => {
  //   const { error } = validate(req.body);
  //   if (error) return res.status(400).send(error.message);
  //   try {
  //     const result = await Rental.updateOne(
  //       { _id: req.params.id },
  //       {
  //         $set: {
  //           title:req.body.title,
  //           genres:req.body.id,
  //           numberInStock:req.body.numberInStock,
  //           dailyRentalRate:req.body.dailyRentalRate
  //         },
  //       }
  //     );
  //     if (result.matchedCount === 0)
  //       res.status(400).send(`There is no Rental of id:${req.params.id}`);
  //     else if (result.matchedCount && result.modifiedCount)
  //       res.send(`Rental info updated`);
  //     else res.send("No Changes Detected in Rental info");
  //   } catch (ex) {
  //     res.status(400).send("Please Provide valid Rental id!!!"+ex.message);
  //   }
  // });

  // router.delete("/:id",async(req,res)=>{
  //     const result = await Rental.deleteOne({_id:req.params.id});
  //     if(result.deletedCount)
  //        res.send("Rental deleted successfully!!!");
  //      else  
  //        res.status(400).send(`There is no Rental of id:${req.params.id}`); 
  // });

module.exports=router;