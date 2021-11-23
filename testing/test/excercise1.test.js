const ex = require('../exercise1');

describe('fizzBuzz',()=>{
   it('should throw exception if input is not a number',()=>{
      const arg = [undefined,'',false];
      arg.forEach(a=>{
        expect(()=>{ex.fizzBuzz(a)}).toThrow();
      });
   });
   it('should return FizzBuzz if input is divisible by 3 & 5.',()=>{
      const result = ex.fizzBuzz(15);
      expect(result).toMatch('FizzBuzz');
   });
   it('should return Fizz if input is divisible by 3.',()=>{
      const result = ex.fizzBuzz(9);
      expect(result).toMatch('Fizz');
   });
   it('should return Buzz if input is divisible by 5.',()=>{
    const result = ex.fizzBuzz(25);
    expect(result).toMatch('Buzz');
   });
     
});