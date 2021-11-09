const fs= require("fs");

fs.writeFile("a.txt","New Text",(err)=>{
   if(err) console.log("Error:",err);
   else 
     console.log("File Written Successfully!!!");
});

fs.appendFile("a.txt"," New Appended Text",(err)=>{
    if(err) console.log("Error:"+err);
    else console.log("Text Appended Successfully!!!");
});


fs.rename("a.txt","data.txt",(err)=>{
    if(err) console.log("Error:"+err);
    else console.log("File Renamed Successfully!!!");
});

fs.unlink("data.txt",(err)=>{
    if(err) console.log("Error:"+err);
    else console.log("File Unlinked!!!");
});

fs.mkdir("Test",(err)=>{
    if(err) console.log("Error:"+err);
    else console.log("Directory Created Successfully!!!");
});

fs.rmdir("Test",(err)=>{
    if(err) console.log("Error:"+err);
    else console.log("Directory Deleted Successfully!!!");
});

