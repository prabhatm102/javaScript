const Joi = require("joi");
const joiObjectId = require("joi-objectid")(Joi);

const validateMovie =async (req,res,next)=>{
    const schema = Joi.object({
       id:joiObjectId().required(),
       title:Joi.string().required(),
       dailyRentalRate:Joi.number().required(),
       numberInStock:Joi.number().required()
    });
      const { error } =  schema.validate(req.body);
        if(error) return res.status(400).send(error.message);
      next();
}

module.exports.validate = validateMovie;