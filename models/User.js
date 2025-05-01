const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email {
    type: String,
    require: true,
    unique: true,
    lowercase: true, 
    trim: true
  },

  password: {
    type: String,
    required: true
  }
});
