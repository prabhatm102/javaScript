console.log("Before");
getUser(1,(user)=>{
    console.log("User:"+user.id);
    getRepositories(user.gitHubUsername,(repos)=>{
        console.log("Repos:"+repos);
    });
});    
                    
console.log("After");

function getUser(id,callback){
    setTimeout(()=>{
        console.log("Reading User info from database....");
        callback({id:id,gitHubUsername:"abc"});
    },2000);
     return 1;
}
function getRepositories(username,callback){
   setTimeout(()=>{
       console.log("Calling Github API..........");
       callback(['repo1','repo2','repo3']);
   },2000);
}