const Joi = require("joi");

const validateUser = async(req,res,next)=>{
    const schema = Joi.object({
       name:Joi.string().required().min(5).max(50),
       email:Joi.string().required().min(5).max(255).email(),
       password:Joi.string().required().min(8)
    });
      const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.message);
      next();  

}

module.exports.validate = validateUser;