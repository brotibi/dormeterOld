const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "I am a student of Northeastern University"
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{collection: 'students'});

const User = mongoose.model('User', UserSchema);

module.exports = User;
