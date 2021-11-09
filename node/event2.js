const Logger = require("./event2.1");
const logger=new Logger();

logger.on("messageLogged",(arg)=>{
    console.log("Listener called!!!",arg);
});

logger.log("Logging In...");