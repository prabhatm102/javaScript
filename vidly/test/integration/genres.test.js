const { Genres } = require("../../models/genre");
const request = require("supertest");
const { result } = require("lodash");
let server;

describe("/api/genres",()=>{
    beforeEach(()=>server = require("../../index"));
    afterEach(()=>server.close());
      describe("GET/",()=>{
         it('should return all genres',async()=>{
           const res = await request(server).get('/api/genres');
           expect(res.status).toBe(200);
         });
      });
});



describe("/api/genres",()=>{
    beforeEach(()=>server = require("../../index"));
    afterEach(async()=>{
        server.close();          
        await Genres.deleteMany({});
    });
      describe("GET/",()=>{
         it('should Insert all genres',async()=>{
             
             await Genres.collection.insertMany([{name:'genre 11'},{name:'genre 21'}]);

           const res = await request(server).get('/api/genres');
           expect(res.status).toBe(200);
           expect(res.body.length).toBe(2);

           expect(res.body.some(g=> g.name==='genre 11')).toBeTruthy();
           expect(res.body.some(g=>g.name==='genre 21')).toBeTruthy();
         });
      });
    
      describe('GET/:id',()=>{
         it('should return a genre if valid is passed',async()=>{
            const genre = new Genres({name:'genre121'});
            await genre.save();
            
            const res = await request(server).get('api/genres'+genre._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name);
         });
      });
      
});