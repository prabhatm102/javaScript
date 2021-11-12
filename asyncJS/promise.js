const p = new Promise((resolve , reject)=>{
    setTimeout(()=>{
   //  resolve(1);
       reject(new Error("Promise Reject...")); 
    },2000);
   
});

p
.then(result=>console.log(result))
.catch(err=>console.log("Error:",err.message));