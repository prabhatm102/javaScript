const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    // console.log(process.env);
     res.render("index",{title:"My App",message:"Welcome!!!"});
 });

 module.exports = router;