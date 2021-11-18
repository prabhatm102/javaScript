const Joi = require("joi");

const validateGenre = async(req,res,next)=>{
    const schema = Joi.object({
       name:Joi.string().min(3).required()
    });
     const { error } =  schema.validate(req.body);
       if(error) res.status(400).send(error.message);
     next();
}

module.exports.validate = validateGenre; 