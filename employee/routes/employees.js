const {Employees,validate} = require("../models/employee");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const express = require("express");
const router = express.Router();

router.get("/",async (req,res)=>{
       const employees = await Employees
          .find({});
        res.send(employees);  
});

router.get("/:empId",async (req,res)=>{
      const employee = await Employees 
        .find({empId:parseInt(req.params.empId)})
          if(employee[0]===undefined) return res.status(400).send("There is no employee of this id:"+req.params.empId);
            res.send(employee);
});


router.post("/",async (req,res)=>{
    const {error} = validate(req.body);
      if(error) return res.status(400).send(error.message);
       const emp = await Employees
           .find()
           .sort({empId:-1})
           .limit(1)
           .select({empId:1});

      const employee = new Employees({
         empId:emp[0]?emp[0].empId+1:1,
         name:req.body.name,
         email:req.body.email,
         salary:parseInt(req.body.salary)
      });
     
      try{
      Employees.schema.plugin(mongooseUniqueValidator);
      const result = await employee.save();
      res.send(result);
      }catch(err){
       let errMsg="";
         for(field in err.errors){
         errMsg+=err.errors[field].message;
         }
         res.status(400).send(errMsg);
      }          
});

router.put("/:empId",async(req,res)=>{
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.message);
      try {
        Employees.schema.plugin(mongooseUniqueValidator);
        const result = await Employees.updateOne(
          { empId: parseInt(req.params.empId) },
          {
            $set: {
              name: req.body.name,
              email: req.body.email,
              salary: parseInt(req.body.salary),
            },
          }
        );
        if (!result.matchedCount)
          return res.status(400).send("The Reuested id is not exists...");
        res.send(result);
      } catch (err) {
        return res.status(400).send(err.message);
      }     
});

router.delete("/:empId",async (req,res)=>{
    const result = await Employees.deleteOne({empId:(parseInt(req.params.empId))});
     if(!result.deletedCount) return res.status(400).send("The Reuested id is not exists...");
    res.send(result);
});


module.exports = router;