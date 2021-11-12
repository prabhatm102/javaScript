console.log("Before");

//By Using Callbacks............
// getUser(1,(user)=>{
//     console.log("User:"+user.id);
//     getRepositories(user.gitHubUsername,(repos)=>{
//       console.log("Repos:"+Object.keys(repos));
//            getCommits(repos,()=>{
//                displayCommits(repos);
//            });
//     });
// });    

// By using Promises..............
getUser(1)
  .then(user=>getRepositories(user.gitHubUsername))
  .then(repos=>getCommits(Object.entries(repos)[0]))
  .then(commits=>displayCommits(commits))
 
  .then(result=>console.log(result))
  .catch(err=>console.log(err));
                    
console.log("After");

function getUser(id){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("Reading User info from database....");
        console.log({id:id,gitHubUsername:"abc"});
     //   reject(new Error("Something Went Wrong..."));
        resolve({id:id,gitHubUsername:"abc"});
    },2000);
  });
}
function getRepositories(username){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Calling Github API For");
            console.log("Getting All Repos Of User:"+username);
            resolve({
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
    });
}

function getCommits(repo){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        //  reject(new Error("Something Went Wrong!!!..."));
            console.log("Getting All Commits Of Repository:"+repo[0]);
            resolve(repo[1]);
        },2000);
    });
 }

 function displayCommits(commits){
     return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           // reject(new Error("Something Went Wrong..."));
            resolve("All commits are:"+commits.commits);
        },2000);    
     });
 }