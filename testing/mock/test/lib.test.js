const db = require("../db");
const lib = require("../lib");
const mail = require("../mail");

describe('applyDiscount',()=>{
   it('should apply 10% discount if customer has more than 10 points.',()=>{
       // Mock functions
       db.getCustomerSync = function(customerId){
           console.log("Fake reading customer...");
           return {id:customerId,points:20};
       }
      const order = {customerId:1, totalPrice:10};
      lib.applyDiscount(order);
      expect(order.totalPrice).toBe(9);
   });
});

describe('notifyCustomer',()=>{
    it('should send an email to the customer.',()=>{
        // const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // mockFunction.mockResolvedValue(1);
        // mockFunction.mockRejectedValue(new Error("..."));

        // const result = await mockFunction();

        // db.getCustomerSync = function(customerId){
        //     return {email:'a'};
        // }
        db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});
    
    //    let mailSent = false;
    //    mail.send = function(email,message){
    //        mailSent = true;
    //    }
        mail.send = jest.fn();
         lib.notifyCustomer({customerId:1});
         expect(mail.send).toHaveBeenCalled();
         
         expect(mail.send.mock.calls[0][0]).toBe('a');
         expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});