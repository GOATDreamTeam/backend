const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// bcrypt is installed, if you are going to use cookies, install jwtoken

const schema = new mongoose.Schema({
  email: {
    type: String, 
    required: true
  },

  passwordHash: {
    type: String, 
    required: true
  },

}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
      delete ret.passwordHash;
    }
  }
});

module.exports = mongoose.model('User', schema);
