const Joi = require("joi"); 
const passwordComplexity = require("joi-password-complexity");

const validate = async (req,res,next)=>{
    const schema = Joi.object({
       email:Joi.string().required().min(5).max(255).email(),
       password:Joi.string().required().min(8)
    });
      const { error } = schema.validate(req.body);
         if(error) return res.status(400).send(error.details[0].message);

     // const ComplexityOptions = {
        //    min:8,
        //    max:16,
        //    lowerCase:1,
        //    numeric:1,
        //    upperCase:1,
        //    symbol:1,
        //    requirementCount:2  // must follow atleast 2 complexity options
        // };
        // const { error } = passwordComplexity(ComplexityOptions,"Password").validate(req.body.password);
        // if(error) return res.status(400).send(error.details[0].message);
      next();
}

module.exports.validate = validate;
 