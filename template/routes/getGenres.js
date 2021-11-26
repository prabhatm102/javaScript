const express = require("express");
const request =  require("request");
const router = express.Router();

router.get('/',(req,res,next)=>{
     fetch("http://localhost:5000/api/genres")
        .then(response=>response.json())
        .then(data=>console.log(data))();
  });
    

module.exports = router;