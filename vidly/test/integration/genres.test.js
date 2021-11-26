const { Genres } = require("../../models/genre");
const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

let server;
let token;
let name;

const exec = function(){
  return request(server)
    .post("/api/genres/")
    .set('x-auth-token',token)
    .send({name});
} ;

describe("/api/genres",()=>{
    beforeEach(()=>server = require("../../index"));
    afterEach(async()=>await server.close());
      describe("GET/",()=>{
         it('should return all genres.',async()=>{
           const res = await request(server).get('/api/genres');
           expect(res.status).toBe(200);
         });
      });
});



describe("/api/genres",()=>{
    beforeEach(()=>{
        server = require("../../index");
        token = new User().genrateAuthToken();
      }
    );
    afterEach(async()=>{
        await server.close();          
        await Genres.deleteMany({});
    });
      describe("GET/",()=>{
         it('should Insert all genres.',async()=>{
             
             await Genres.collection.insertMany([{name:'genre1'},{name:'genre2'}]);

           const res = await request(server).get('/api/genres');
           expect(res.status).toBe(200);
           expect(res.body.length).toBe(2);

           expect(res.body.some(g=> g.name==='genre1')).toBeTruthy();
           expect(res.body.some(g=>g.name==='genre2')).toBeTruthy();
         });
      });
    
      describe('GET/:id',()=>{
         it('should return a genre if valid id is passed.',async()=>{
            const genre = new Genres({name:'genre121'});
            await genre.save();
            
            const res = await request(server).get('/api/genres/'+genre._id.toHexString());

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name',genre.name);
         });
         it('should return 404 if invalid id is passed.',async()=>{
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
         });
         it('should return 400 if no genre of given ID exixts.',async()=>{
            const res = await request(server).get('/api/genres/'+mongoose.Types.ObjectId());
            expect(res.status).toBe(400);
         });
      });

      describe("POST/",()=>{
         it('should return 401 if client is not logged-in.',async()=>{
            token = "";
            const res = await exec(); 
            expect(res.status).toBe(401);
         });
         it('should return 400 if genre is less 3 characters.',async()=>{
            name = "ab"
            const res = await exec();
               expect(res.status).toBe(400);
         });
         it('should return 400 if genre is more than 10 characters.',async()=>{
           name = new Array(15).join('a');
           const res = await exec();
                expect(res.status).toBe(400);         
         });
         it('should save the genre if it is valid.',async()=>{
            name = "genre1";
            await exec();
           //   expect(res.status).toBe(200);    
             const genre = await Genres.find({name:'genre1'});
             expect(genre).not.toBeNull();           
         });
         it('should return genre if it is valid.',async()=>{
            name = "genre1";
            const res = await exec();
             expect(res.body).toHaveProperty("_id");
             expect(res.body).toHaveProperty("name","genre1");              
         });
      });
      
});