const fs=require("fs");

let files=fs.readdirSync("./");
console.log("Synchrnous:"+files);

console.log("Directory Successfully read!!!");

let filesA=fs.readdir("./",(err,files)=>{
    if(err) console.log("Error:",err);
    else console.log("Asynchronous:"+files);
});

console.log("End");