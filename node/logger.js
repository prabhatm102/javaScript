let url="http://rudra.in";

console.log(__dirname);
console.log(__filename);
// console.log(module);
// console.log(exports);
// console.log(require);

function log(message){
    console.log(message);
}

module.exports={
   log:log,
   url:url
};