const { User }  = require("../../../models/user");
const mongoose = require("mongoose");
const auth = require("../../../middleware/auth");

describe('auth middleware',()=>{
  it('should populate reg.user with the payload of a valid jwt',()=>{
    const user = {
        _id : mongoose.Types.ObjectId(),
        isAdmin : true
    }  
    const token = new User(user).genrateAuthToken();
     const req = {
         header : jest.fn().mockReturnValue(token)
     }
     const res={};
     const next = jest.fn();
     auth(req,res,next);
     expect(req.user).toMatchObject(user);
  });
});