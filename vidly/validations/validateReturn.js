const Joi = require("joi");
const joiObjectId = require('joi-objectid')(Joi);

module.exports.validateReturn = function(req){
  const schema = Joi.object({
     customerId:joiObjectId().required(),
     movieId:joiObjectId().required()
  });
    return schema.validate(req);
};