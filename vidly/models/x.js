// POST /api/returns      {customerId,movieId}
   // return 401 if client is not logged in
   // return 400 if customerId is not provided
   // return 400 if movie id is not provided
   // return 404 if no rental found for this customer/movie
   // return 400 if rental is already processed
   // return 200 if valid request
   // set the return date
   // calculate the rental fee
   // increase the stock
   // return the rental