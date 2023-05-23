const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: false},
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
