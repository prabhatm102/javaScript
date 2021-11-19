const port = process.env.PORT || 5000
const express = require("express");
const app  = new express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config")();
require("./startup/validation");

 
app.listen(port,()=>{
   console.log(`Server  is listening at ${port}...`);
});