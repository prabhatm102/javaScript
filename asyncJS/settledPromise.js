const p1 = Promise.resolve("Promise is already resolve.....");
p1
  .then(res=>console.log(res));

const p2 = Promise.reject(new Error("Promise is Already Rejected!!!"));
p2.catch(err=>console.log(err.message));