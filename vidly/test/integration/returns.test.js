const request = require("supertest");
const mongoose = require("mongoose");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const moment = require("moment");
const { Movie } = require("../../models/movie");

describe('/api/returns/',()=>{
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;
  let exec = function(){
      return  request(server)
         .post('/api/returns/')
         .set('x-auth-token',token)
         .send({customerId,movieId});
   };

   beforeEach(async()=>{
       server = require("../../index");
       token = new User().genrateAuthToken();
       customerId = mongoose.Types.ObjectId();
       movieId = mongoose.Types.ObjectId();
       movie = new Movie({
          _id:movieId,
          title:'12345',
          genres:{
              _id:mongoose.Types.ObjectId()
          },
          numberInStock:10,
          dailyRentalRate:50
       });
       await movie.save();
        rental = new Rental({
           customer:{
               _id:customerId,
               name:'12345',
               phone:'1234567891'
           },
           movie:{
               _id:movieId,
               title:'12345',
               dailyRentalRate:50
           }
       });
       await rental.save();
    });
   afterEach(async()=>{
       await server.close();
       await Rental.deleteMany();
       await Movie.deleteMany();
    });
      it('should return 401 if client is not logged in.',async()=>{
          token="";
          const res = await exec();
          expect(res.status).toBe(401);
      });
      it('should return 400 if customerId is not provided.',async()=>{
          customerId = "";
          const res = await exec();
            expect(res.status).toBe(400);  
      });
      it('should return 400 if movieId is not provided.',async()=>{
        movieId = "";  
        const res = await exec();
            expect(res.status).toBe(400);  
      });
      it('should return 404 if no rental found for given customerId/movieId.',async()=>{
          await Rental.deleteOne();
          const res = await exec();
          expect(res.status).toBe(404);
      });
      it('should return 400 if return is already processed.',async()=>{
          rental.dateReturned = Date.now();
          await rental.save();
            const res = await exec();
            expect(res.status).toBe(400);
      });
      it('should return 200 if valid request.',async()=>{
          const res = await exec();
            expect(res.status).toBe(200);
      });
      it('should set the dateReturned if input is valid.',async()=>{
         await exec();
         const rentalDb = await Rental.findById(rental._id);
         const diff = new Date()-rentalDb.dateReturned;
         expect(diff).toBeLessThan(10*1000);      
      });
      it('should set the rentalDate if input is valid.',async()=>{
          rental.dateOut = moment().add(-7,'days').toDate();
          await rental.save();
          await exec();
          const rentalDb = await Rental.findById(rental._id);
          expect(rentalDb.rentalFee).toBe(350);
      });
      it('should increase the movie stock if input is valid.',async()=>{
          await exec();
          const movieInDb = await Movie.findById(movieId);
          expect(movieInDb.numberInStock).toBe(movie.numberInStock+1);
      });
      it('should return the rental if input is valid.',async()=>{
        const res = await exec();
        expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['dateOut','dateReturned','customer','movie']));
    });
});