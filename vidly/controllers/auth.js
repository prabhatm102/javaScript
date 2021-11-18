const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const login = async (req,res)=>{
   try{
      const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send("Invalid email or password!");

      const isPassword =await bcrypt.compare(req.body.password,user.password);
        if(!isPassword) return res.status(400).send("Invalid email or password!");
      const token = user.genrateAuthToken();
    //  const token = jwt.sign({_id:user.id},config.get('jwtPrivateKey'));
        res.status(200).send(token);
    }catch(ex){
        res.status(400).send(ex.message);
     }
};

module.exports = {
    login:login
};