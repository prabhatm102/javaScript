const { describe, it } = require("jest-circus");
const request = require("supertest");
describe('/api/customers/',()=>{
    let server
    beforeEach(()=>{server = require("../../index");});
    afterEach(async()=>{server.close();});
    describe('GET/',()=>{
        it('should return all the customers.',async()=>{
           const res = await request(server).get('/api/customers');
           expect(res.status).toBe(200);
        });
    });
    describe('POST/',()=>{
         it('should return 400 if ',async()=>{
   
        });
    });
});
