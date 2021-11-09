const express = require("express");
const app = express();


app.get("/",(req,res)=>{
    console.log(process.env);
    res.send("Hello");
});

app.get("api/courses",(req,res)=>{
    res.send([10,20,50,21]);
});

app.get("/api/posts/:year/:month",(req,res)=>{
   // res.send(req.params);
    res.send(req.query);
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log(`Server is listening at ${port}`);});

// app.listen(3000,()=>console.log("Server is listening at 3000....."));