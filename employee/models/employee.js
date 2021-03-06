const Joi = require("joi");
const mongoose = require("mongoose");

const Employees = mongoose.model("employees",new mongoose.Schema({
    empId:Number,
    name:{
        type:String,
        required:true,
        maxlength:5,
        /*,minlength:3*/
     },
    email:{
        type:String,
        unique:true,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
}));

function validateEmp(emp){
    const schema = Joi.object({
        name:Joi.string().required().min(3),
        salary:Joi.number().required().min(8000),
        email:Joi.string().required().email({minDomainSegments:2 , tlds:{allow:['com','net']}})
      });
      return schema.validate(emp);
}


exports.Employees = Employees;
exports.validate = validateEmp;