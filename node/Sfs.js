const fs=require("fs");

fs.writeFileSync("a.txt","Rewitten text!!!");
fs.appendFileSync("a.txt"," Some more text appended!!!");

console.log(fs.readFileSync("a.txt","utf-8"));

fs.unlinkSync('a.txt');
//fs.renameSync("OS.js","os.js");

fs.mkdirSync("Test");
fs.rmdirSync("Test");

console.log("__________________________Done_____________________");

