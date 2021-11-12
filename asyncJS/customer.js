// By Using Callbacks

// getCustomer(1,(customer)=>{
//     console.log(customer);
//       if(customer.isGold){
//           getTopMovies((movies)=>{
//              console.log("Top Movies:"+movies);
//              sendMail(customer.email,movies,()=>{
//                 console.log("Email Sent");
//              });
//           });
//       }else{
//           console.log("Customer have not gold subscription.")
//       }
// });

// By Using Promises



function getCustomer(id,callback){
    setTimeout(()=>{
        console.log("Getting Customer Information...");
       callback({
            id:id,
            name:"xyz",
            isGold:true,
            email:"abc@gmail.com"
         });
    },2000);
}

function getTopMovies(callback){
    setTimeout(()=>{
        console.log("Getting Top Movies......");
      callback(["movie1","movie2","movie3"]);
    },2000);
}

function sendMail(email,movies,callback){
   setTimeout(()=>{
       console.log("Sending Top Movies To Customer Via Email.....");
       callback();
   },2000);
}