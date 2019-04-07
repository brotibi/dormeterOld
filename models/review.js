const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var user = require('../models/user');

const ReviewSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dorm: { // Represents the name of the dorm
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  user_id: {
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
  { collection: 'reviews' });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
