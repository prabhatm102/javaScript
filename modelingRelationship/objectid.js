const Joi = require("joi");
const joiObjectId = require("joi-objectid")(Joi); 

const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();
const isValid = mongoose.Types.ObjectId.isValid("1234");

 console.log(id.toString());
 console.log(id.getTimestamp());
 console.log(isValid);

 function validId(rental){
     const schema = Joi.object({
        customerId:joiObjectId().required(),
        movieId:joiObjectId().required()
     });
       return schema.validate(rental);
 }
const rental ={
   customerId:"61923f145b2fb878feabe67",
   movieId:   "61925fa8b00b07d6c75f54c2"
};
const { error } = validId(rental);
  if(error) console.log(error.message);