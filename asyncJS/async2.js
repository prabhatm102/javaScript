console.log("Before");
const user = getUser(1);     // Function will return undefined

                             // to handle async code we have callback,promise,async/await
console.log(user);
console.log("After");

function getUser(id){
    setTimeout(()=>{
        console.log("Reading User info from database....");
        return {id:id,gitHubUsername:"abc"};
    },2000);
     return 1;
}