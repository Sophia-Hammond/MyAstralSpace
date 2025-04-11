const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  background: {
    type: String,
    required: true,
  },

  notes: [
    {
      text: String,
      x: Number,
      y: Number
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Board', boardSchema);
