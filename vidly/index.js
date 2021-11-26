const port = process.env.PORT || 5000
const express = require("express");
const winston = require("winston");
const app  = new express();
const hbs = require("express-hbs");

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

app.engine('hbs', hbs.express4({
   partialsDir: __dirname + '/views/partials'}));
   
 app.set("view-engine","hbs");
 app.set('views', __dirname + '/views');
 
const server = app.listen(port,()=>{
   winston.log("info",`Server  is listening at ${port}...`);
});

module.exports = server;