console.log("Before");
getUser(1,getRepositories);
console.log("After");

function getRepositories(user){
    console.log(user.gitHubUsername);
    getRepositories(user.gitHubUsername,getCommits);
}

function getCommits(repos){
    getCommits(repos[0],displayCommits);
}

function displayCommits(commits){
    console.log("commit");
}
//________________________________________________________________________________________________

function getUser(id,callback){
   setTimeout(()=>{
       console.log("Reading User info from database....");
       getRepositories({id:id,gitHubUsername:"xyz"});
   },2000);
}

function getRepositories(username,callback){
    setTimeout(()=>{
        console.log("Calling GitHub API.........");
        getCommits(['repo1','repo2','repo3']);
    },2000);
}

function getCommits(repos,callback){
    setTimeout(()=>{
        console.log("Getting All commits...........");
        displayCommits(repos);
    },2000);
}