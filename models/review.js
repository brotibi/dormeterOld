const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{collection: 'reviews'});

const User = mongoose.model('User', UserSchema);

module.exports = User;
