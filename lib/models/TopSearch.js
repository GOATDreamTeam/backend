const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  common_name: {
    type: String, 
    required: true
  },
    
  scientific_name: {
    type: String, 
    required: true
  },

  // plant ID is here because if we are populating the database with top searches, we want to avoid duplicating plants with the same common/scientific name in top searches db; might be able to just use scientific name, test this behavior in the front end 
  
  plantID: {
    type: String, 
    required: true
  },

  incrementCounter: {
    type: Number
  }
});

module.exports = mongoose.model('TopSearch', schema);
