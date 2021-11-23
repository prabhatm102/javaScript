const mongoose = require("mongoose");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");

describe('user.genrateAuthToken',()=>{
   it('should return a valid JWT',()=>{
      const payload = {
         _id:new mongoose.Types.ObjectId().toHexString(),
         isAdmin:true
      };
         const user = new User(payload);
         const token = user.genrateAuthToken();
         
         const decoded = jwt.verify(token,config.get("jwtPrivateKey"));
         expect(decoded).toMatchObject(payload);
       
   });
});