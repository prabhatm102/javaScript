const http= require("http");

const server= http.createServer((req,res)=>{
    
    if(req.url==="/"){
        res.write("This is HomePage!!!");
    }
    if(req.url==='/api'){
        res.write(JSON.stringify([1,2,3]));
    }
      res.end();
});

server.listen(3000);
console.log("Server is listening at 3000...");