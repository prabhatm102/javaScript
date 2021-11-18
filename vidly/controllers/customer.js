const { Customer } = require("../models/customer");

const getCustomers = async (req,res)=>{
    res.status(200).send(await Customer.find({}));
}

const setCustomer = async (req,res)=>{
    try{
        const customer = new Customer({
            name:req.body.name,
            phone:req.body.phone,
            isGold:req.body.isGold
         });
        await customer.save();
        res.status(200).send(customer);
      }catch(ex){
        res.status(400).send(ex.message);
    }
}

const updateCustomer = async(req,res)=>{
    try {
        const result = await Customer.updateOne(
          { _id: req.params.id },
          {
            $set: {
              name: req.body.name,
              phone: parseInt(req.body.phone),
              isGold: req.body.isGold,
            },
          }
        );
        if (result.matchedCount === 0)
          res.status(400).send(`There is no customer of id:${req.params.id}`);
        else if (result.matchedCount && result.modifiedCount)
          res.send(`Customer info updated`);
        else res.send("No Changes Detected in customer info");
      } catch (ex) {
        res.status(400).send(`customer id must be 12 byte--> ${ex.message}`);
      }
}

const deleteCustomer = async(req,res)=>{
   try{
     const result = await Customer.deleteOne({_id:req.params.id});
      if(result.deletedCount)
        res.status(200).send("Customer deleted successfully!!!");
      else  
        res.status(400).send(`There is no customer of id:${req.params.id}`); 
   }catch(ex){
        res.status(400).send(ex.message);
   }
}

module.exports = {
    getCustomers:getCustomers,
    setCustomer:setCustomer,
    updateCustomer:updateCustomer,
    deleteCustomer:deleteCustomer
}