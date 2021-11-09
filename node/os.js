const os= require("os");

console.log("Total Memory:"+os.totalmem());
console.log("Free Memory:"+os.freemem());
console.log("Version:"+os.version());
console.log("Platform:"+os.platform());
console.log("Type:"+os.type());
console.log("Architecture:"+os.arch());
console.log("Hostname:"+os.hostname());
console.log("Home dir:"+os.homedir());
console.log("Uptime:"+os.uptime());
console.log("User Info:"+os.userInfo().uid);
