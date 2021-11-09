const EventEmitter= require("events");

class Logger extends EventEmitter{
  log(message){
    console.log(message);
    this.emit("messageLogged",{id:101,url:"https://"});
  }
}

module.exports=Logger;