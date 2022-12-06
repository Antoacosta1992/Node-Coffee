    const mongoose = require('mongoose');


    const dbConnection =async() => {
    
      try {
    
         mongoose.connect( process.env.MONGODB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopoLogy: true
        } );
    
        console.log('Online Database');
    
      } catch (error) {
        console.log(error);
        throw new Error('Error Database');
      }
    
    }
    
    module.exports = {
    
      dbConnection
    
    }