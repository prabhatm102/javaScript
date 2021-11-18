const Joi = require("joi");
// const joiObjectId = require("joi-objectid")(Joi);

const validateCustomer = async(req,res,next)=>{
    const schema = Joi.object({
       name:Joi.string().required().min(3),
       phone:Joi.number().min(1000000000).max(9999999999).required(),
       isGold:Joi.boolean()
    });
      const { error } = schema.validate(req.body);
       if(error) return res.status(400).send(error.message);
      next();
}


module.exports.validate = validateCustomer;