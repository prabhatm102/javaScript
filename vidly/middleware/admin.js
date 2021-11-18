module.exports = function(req,res,next){
   if(!req.user.isAdmin) return res.status(403).send("Access Denied!!!");
   next();
}


// 401 --> unauthorised
// 403 --> forbidden