const { User } = require("../models/user");
const passwordComplexity = require("joi-password-complexity");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const userInfo = async(req,res)=>{
    const user = await User.findById(req.user._id)
                  .select("-password");
    res.status(200).send(user); 
};

const setUser = async(req,res)=>{
    try{
        const email = await User.findOne({email:req.body.email});
        if(email) return res.status(400).send("Email is already taken!");
      
       //  const user = new User({
       //      name:req.body.name,
       //      email:req.body.email,
       //      password:req.body.password
       //  });
   
       // For Complex password...............
       // const ComplexityOptions = {
       //    min:8,
       //    max:16,
       //    lowerCase:1,
       //    numeric:1,
       //    upperCase:1,
       //    symbol:1,
       //    requirementCount:2  // must follow atleast 2 complexity options
       // };
       // const { error } = passwordComplexity(ComplexityOptions,"Password").validate(req.body.password);
   
       // if(error) return res.status(400).send(error.details[0].message);
   
         const user =new User(_.pick(req.body,["name","email","password"]));
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password,salt);
       
            await user.save();
           //  const result = {
           //      name:user.name,
           //      email:user.email
           //  }
            const token  = user.genrateAuthToken();
            res.status(200).header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
    }catch(ex){
       res.status(400).send(ex.message);
    }
};

module.exports = {
    userInfo:userInfo,
    setUser:setUser
};