const bcrypt = require("bcrypt");

(async function run(){
   const salt = await bcrypt.genSalt(10);
   const hashed = await bcrypt.hash("1234",salt);
   console.log(await bcrypt.compare('1234',hashed));
   console.log('1234'===hashed);
   console.log(salt);
   console.log(hashed);
})();
