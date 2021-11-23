const lib = require("../lib");
describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});
//Testing String....

describe('greet',()=>{
   it('should return greeting message.',()=>{
       const result = lib.greet('xyz');
      
      // expect(result).toBe('Welcome xyz!');
       expect(result).toMatch(/xyz!/);
       expect(result).toContain('xyz')
   });
});

// Testing Array
describe('getCurrencies',()=>{
   it('should return supported currencies',()=>{
      const result = lib.getCurrencies();

      //Too general...
      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      // Too specific
      expect(result[0]).toBe('INR');
      expect(result[1]).toBe('USD');
      expect(result[2]).toBe('EURO');
      expect(result.length).toBe(3);

      // Proper way
      expect(result).toContain('USD');
      expect(result).toContain('INR','EURO');

      // Ideal way
      expect(result).toEqual(expect.arrayContaining(['INR','EURO','USD']));
   });
});

// Testing objects

describe('getProduct',()=>{
   it('should return product with the given ID',()=>{
     const result = lib.getProducts(1);
    // expect(result).toBe({id:1,price:10});  //fail because both object's memory location is different
    expect(result).toEqual({id:1,price:10});     // must give all property as arg.
    expect(result).toMatchObject({id:1});       // not necessary to give all property as arg.
    expect(result).toHaveProperty("price",10);  // Arg must follow dataType
   });
});

// Testing Exceptions

describe('registerUser',()=>{
   it('should throw exception if username is falsy.',()=>{
      const arg = [null,undefined,NaN,'',false,0];
      arg.forEach(a=>{
         expect(()=>{lib.registerUser(a)}).toThrow();
      });
   });
   it('should return user object if valid username is passed.',()=>{
      const result = lib.registerUser('xyz');
      expect(result).toMatchObject({username:'xyz'});
      expect(result.id).toBeGreaterThan(0);
   });
});

// test("absolute- should return a positive number if input is positive",()=>{
//    const result = lib.absolute(1);
//    expect(result).toBe(1);
// });

// test("absolute- should return a positive number if input is negative",()=>{
//     const result = lib.absolute(-1);
//     expect(result).toBe(1);
//  });

//  test("absolute- should return 0 if input is 0",()=>{
//     const result = lib.absolute(0);
//     expect(result).toBe(0);
//  });



// __________________________________________________________________________________________

/*
Matchers-----------------------------------------------
toBe(value)   ----> toBe uses to test exact equality. If you want to check the value of an object,
 use toEqual instead:
                       toEqual({one:1,two:2});

Truthiness--------------------------------------------

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

Numbers----------------------------------------------

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

String------------------------------------------------

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

Array And Iterableds-------------------------------

const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});

Exceptions:--------------------------------

   function compileAndroidCode() {
      throw new Error('you are using the wrong JDK');
    }

   test('compiling android goes as expected', () => {
      expect(() => compileAndroidCode()).toThrow();
      expect(() => compileAndroidCode()).toThrow(Error);

  // we can also use the exact error message or a regexp
      expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
      expect(() => compileAndroidCode()).toThrow(/JDK/);
    });




*/