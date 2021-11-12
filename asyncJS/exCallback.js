console.log("Before");
getUser(1,(user)=>{
    console.log("User:"+user.id);
    getRepositories(user.gitHubUsername,(repos)=>{
      console.log("Repos:"+Object.keys(repos));
           getCommits(repos,()=>{
               displayCommits(repos);
           });
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
       console.log("Calling Github API For");
       console.log("Getting All Repos Of User:"+username);
       callback({
           repo1: {
             commits: ["commit1", "commit2", "commit3"],
           },
           repo2: {
             commits: ["commit1"],
           },
           repo3: {
             commits: ["commit1", "commit2", "commit3", "commit4"],
           },
       });
   },2000);
}

function getCommits(repos,callback){
    setTimeout(()=>{
        console.log("Getting All Commits Of Repository:"+Object.keys(repos)[0]);
        callback(repos);
    },2000);
 }

 function displayCommits(repos){
    setTimeout(()=>{
        console.log("All commits Of "+Object.keys(repos)[0]+":"+repos.repo1.commits);
    },2000);
 }