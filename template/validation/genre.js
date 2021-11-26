const Joi = require("joi");

const validateGenres = (req,res,next)=>{
   const schema = Joi.Object({
     name:Joi.string().required().min(3)
   });
   const { error } = schema.validate(req.body);
     if(error) return res.status(400).send(error.message);
   next();
};

module.exports.validate = validateGenres;