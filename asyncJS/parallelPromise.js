const p1 = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        console.log("Async Operation 1...");
       // reject(new Error("Error:Could't complete async operation 1"));
        resolve(1);
    },2000);
});

const p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Async Operation 2...");
        reject(new Error("Error:Could't complete async operation 2"));
        resolve(2);
    },2000);
});

// p1.then(res=>console.log(res));
// p2.then(res=>console.log(res));

Promise.all([p1,p2])                             // Running Promises Parallely.
  .then(res=>console.log(res))
  .catch(err=>console.log(err.message));

// Promise.race([p1,p2])
//    .then(res=>console.log(res))
//    .catch(err=>console.log(err.message));