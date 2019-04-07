const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { ensureAuthenticated } = require('../config/auth');
const passport = require('passport');
// Load User model
var user = require('../models/user');
const Review = require('../models/review');


// Post a Review Page
router.get('/review', ensureAuthenticated, (req, res) => res.render('review.ejs'));



// Written Post
router.post('/review', ensureAuthenticated, (req, res) => {
  console.log(req.user.university);
  const { title, dorm, rating, content } = req.body;
  let errors = [];

  if (!dorm || !content || !title || !rating) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('review.ejs', {
      errors,
      title,
      content,
      dorm,
      rating
    });
  } else {
    Review.findOne({ content: content }).then(review => { // Searches the database for any content that matches this one
      if (review) {
        errors.push({ msg: 'Post already exists' });
        res.render('review.ejs', {
          errors,
          title,
          content,
          dorm,
          rating
        });
      } else {
        const newReview = new Review({
          title,
          content,
          dorm,
          rating,
          user_id: req.user._id,
          university: req.user.university
        });

        newReview
          .save()
          .then(user => {
            req.flash(
              'success_msg',
              'You have successfully posted your post'
            );
            res.redirect('/dashboard');
          })
          .catch(err => console.log(err));
      }
    });
  }
});

module.exports = router;
