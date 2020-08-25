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

  images: [{
    flower: {
      image_url: {
        type: String
      }
    },
    leaf: {
      image_url: {
        type: String
      }
    }
  }]
});

module.exports = mongoose.model('Plant', schema);
