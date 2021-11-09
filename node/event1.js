const EventEmitter= require("events");
const emitter= new EventEmitter();

emitter.on("messageLogged1",()=>{
    console.log("Listener Called!!!");
})

emitter.emit("messageLogged1");

emitter.on("messageLogged2",(arg)=>{
    console.log("Listener Called!!!:",arg);
});

emitter.emit("messageLogged2",{id:1,url:"https://"});