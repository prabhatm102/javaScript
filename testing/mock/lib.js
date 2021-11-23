const db = require("./db");
const mail = require("./mail");
// mock function

module.exports.applyDiscount = function(order){
   const customer = db.getCustomerSync(order.customerId);
     if(customer.points>10)
       order.totalPrice*=0.9;
};

// Interaction Testing ...
module.exports.notifyCustomer = function(order){
  const customer = db.getCustomerSync(order.customerId);
    mail.send(customer.email,'Your order has been placed successfully.');
};