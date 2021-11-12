const Joi = require("joi");
const express = require("express");
const mUV = require("mongoose-unique-validator");
const router = express.Router();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercise")
  .then(()=>console.log("Connected To Database......."))
  .catch((err)=>console.log(err.message));

const empSchema = mongoose.Schema({
    empId:Number,
    name:{type:String,unique:true,required:true},
    salary:Number,
});
const Employees = mongoose.model("employees",empSchema);
router.get("/",(req,res)=>{
    (async ()=>{
       const employees = await Employees
          .find({});
        res.send(employees);  
    })();
});

router.get("/:empId",(req,res)=>{
   (async ()=>{
      const employee = await Employees 
        .find({empId:parseInt(req.params.empId)})
          if(employee[0]===undefined) return res.status(400).send("There is no employee of this id:"+req.params.empId);
            res.send(employee);
   })();
});


router.post("/",(req,res)=>{
   (async ()=>{ 
    const {error} = validateEmp(req.body);
      if(error) return res.status(400).send(error.message);
       const emp = await Employees
           .find()
           .sort({empId:-1})
           .limit(1)
           .select({empId:1});

      const employee = new Employees({
         empId:emp[0].empId+1,
         name:req.body.name,
         salary:parseInt(req.body.salary)
      });
     
      try{
      Employees.schema.plugin(mUV);
      const result = await employee.save();
      res.send(result);
      }catch(err){
        console.log(err.message);
      }
      
   })();            
});

router.put("/:empId",(req,res)=>{
    (async ()=>{
      const {error} = validateEmp(req.body);
      if(error) return res.status(400).send(error.message);

       const result = await Employees.updateOne({empId:parseInt(req.params.empId)},
       {
         $set:{
           name:req.body.name,
           salary:parseInt(req.body.salary)
         }
       });         
        if(!result.matchedCount) return res.status(400).send("The Reuested id is not exists...");      
       res.send(result);
    })();
     
});

router.delete("/:empId",(req,res)=>{
   (async ()=>{
    const result = await Employees.deleteOne({empId:(parseInt(req.params.empId))});
     if(!result.deletedCount) return res.status(400).send("The Reuested id is not exists...");
    res.send(result);
   })();
});

function validateEmp(emp){
    const schema = Joi.object({
        name:Joi.string().required().min(3),
        salary:Joi.number().required().min(8000)
      });
      return schema.validate(emp);
}

module.exports = router;