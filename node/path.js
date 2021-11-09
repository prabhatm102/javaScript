const path=require("path");

let pathObj=path.parse(__filename);

console.log(pathObj);

console.log("Root:"+pathObj.root);
console.log("Dir:"+pathObj.dir);
console.log("Base:"+pathObj.base);
console.log("Ext:"+pathObj.ext);
console.log("Name:"+pathObj.name);

let url="https://rudra.in/app/demo.js";
console.log(path.dirname(url));
console.log(path.basename(url));
console.log(path.extname(url));

let url1="http://",url2="rudra",url3="apps";

console.log(path.join(url1,url2,url3,'..'));  // If we specify .. it will ignore near url
