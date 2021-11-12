const employees = require("./routes/employees");
const express = require("express");
const app = express();

app.use(express.json());
app.get("/",(req,res)=>{
   res.send("HomePage!!!");
});

app.use("/api/employees",employees);

const port = process.env.PORT | 3000
app.listen(port,()=>{
    console.log("Server is listening at "+port);
});