module.exports.absolute = function(number){
    return (number>=0)?number:-number;
};

// Testing Strings

module.exports.greet = function(name){
   return "Welcome "+name+'!';
};

// Testing Array

module.exports.getCurrencies = function(){
   return ['INR','USD','EURO'];
};

// Testing Objects

module.exports.getProducts = function(productId){
    return {id:productId,price:10};
};

// Testing Exceptions

module.exports.registerUser = function(username){
   if(!username) throw new Error("Username is required!");

   return {id:new Date().getTime(),username:username};
};