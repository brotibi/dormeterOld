const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  name: {
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
{collection: 'students'});

const User = mongoose.model('User', UserSchema);

module.exports = User;
