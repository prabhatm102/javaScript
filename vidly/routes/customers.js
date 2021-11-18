const { getCustomers, setCustomer, updateCustomer, deleteCustomer} = require("../controllers/customer");
const { validate } = require("../validations/customer");
const express = require("express");
const router = express.Router();

  router.get("/",getCustomers);

  router.post("/",[validate,setCustomer]);

  router.put("/:id",[validate,updateCustomer]);

  router.delete("/:id",deleteCustomer);
  
module.exports=router;