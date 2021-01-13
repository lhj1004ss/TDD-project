const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  age: {
    type: Number
  }
})

const User = mongoose.model('user', userSchema);
module.exports = User;