/* Modeling Relationship : Trade of b/w query performance & consistency...
    
     1) Using References(Normalization)---->CONSISTENCY
         let author = {
             name:"author name"
         } 

         let course = {
            ........
            author:ref(id)
         }
     
     2) Using Embedded Documents(Denormalization)----> Performence
         let course = {
             author:{
                 name : 'author name'
             }
         }    
     
     3) Hybrid 
         let author = {
             name : 'author name',
             // 50 other properties
         }

         let course = {
             author:{
                 id:'reference',
                 name:'author name'
             }
         }

*/