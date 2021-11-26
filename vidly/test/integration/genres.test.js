const { Genres } = require("../../models/genre");
const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

let server;
let token;
let name;
let id;

const exec = function(){
  return request(server)
    .post("/api/genres/")
    .set('x-auth-token',token)
    .send({name});
};

const execPut = function(){
   return request(server)
     .put(`/api/genres/${id}`)
     .send({name});
};

const execDelete = function(){
   return request(server)
       .delete(`/api/genres/${id}`)
       .set('x-auth-token',token);
};

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
        token = new User({isAdmin:true}).genrateAuthToken();
        id = mongoose.Types.ObjectId();
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
      describe("PUT/:id",()=>{
         it('should return 404 if invalid id is passed.',async()=>{
            id="1";
            const res = await execPut();
              expect(res.status).toBe(404);
         });
         it('should return 400 if update genre name is less than 3 characters.',async()=>{
            name = "ge";
            const res = await execPut();
             expect(res.status).toBe(400);
         });
         it('should return 400 if update genre name is more than 10 characters.',async()=>{
            name = new Array(12).join('a');
            const res = await execPut();
            expect(res.status).toBe(400);
         });
         it('should return 401 if no genre of given Id exists.',async()=>{
            name ='1234';
            const res = await execPut();
            expect(res.status).toBe(401);
         });
         it('should update the genre if given input and id is valid.',async()=>{
            name ='genre11';
            const genre = await exec();
            name = "genreU";
            id = genre.body._id;
            const res = await execPut();
            expect(res.text).toBe(`Genres name updated to ${name}`);          
         });
         it('should return 204 if given input and id is valid but updated name is same as previous name.',async()=>{
            name ='genre11';
            const genre = await exec();
            name = "genre11";
            id = genre.body._id;
            const res = await execPut();
            expect(res.status).toBe(204);          
         });
     });
     describe("DELETE/:id",()=>{
        it('should return 401 if no token is provided.',async()=>{
           token="";
           const res = await execDelete();
           expect(res.status).toBe(401);
        });
        it('should return 400 if invalid token is provided.',async()=>{
         token="invalidtoken";
         const res = await execDelete();
         expect(res.status).toBe(400);
        });
        it('should return 403 if user in not admin.',async()=>{
           token = new User({}).genrateAuthToken();
           const res = await execDelete();
           expect(res.status).toBe(403);
        });
        it('should return 400 genre if admin is logged-in but no genre exits of given id.',async()=>{
         const res = await execDelete();
         expect(res.status).toBe(400);
         });
         it('should delete the genre if admin is logged-in.',async()=>{
            const genre = await exec();
            id = genre.body._id;
            const res = await execDelete();
            expect(res.status).toBe(200);
         });
     });
});