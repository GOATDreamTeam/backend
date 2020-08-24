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

  image_url: {
    type: String, 
    required: true 
  },

  incrementCounter: {
    type: Number
  }
});

module.exports = mongoose.model('TopSearch', schema);
