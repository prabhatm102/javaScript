const Joi = require("joi");
const joiObjectId = require("joi-objectid")(Joi);


const validateRental = async(req,res,next)=>{
    const schema = Joi.object({
       customerId:joiObjectId().required(),
       movieId:joiObjectId().required(),
       dateReturned:Joi.date().required().min(Date.now())
    });
      const { error } =  schema.validate(req.body);
       if(error) return res.status(400).send(error.message);
      next();
}

module.exports.validate = validateRental;