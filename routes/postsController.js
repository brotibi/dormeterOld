const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { ensureAuthenticated } = require('../config/auth');
const passport = require('passport');
// Load User model
var User = require('../models/user');
const Review = require('../models/review');

router.use('/assets', express.static('assets'));

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
            res.redirect(`/posts/review/${newReview._id}`);
          })
          .catch(err => console.log(err));
      }
    });
  }
});


// Getting the string of the webpage
router.get('/review/:id', (req, res) =>{
  //res.send(req.params);
  postname = req.params;
  // console.log(user.findOne({'name': username.name}, 'name').name);
  Review.findById(postname.id, 'title content dorm university user_id', (err, posts) => {
      //if (err) return handleError(err);
      if (err) res.redirect('/dashboard');
      //console.log(person.university);
      if(posts === null) {
        res.redirect('/dashboard');
      } else {
        User.findById(posts.user_id, (err, user) => {
      res.render('posts.ejs',{
          review: posts,
          user: user
      })
    })
    }
  });
}); 
/*
router.get('/review/:id', function(req, res, next) {
  var id = req.params.id
  Review.findById(id)        
      .lean().exec(function (err, results) {
      if (err) return console.error(err)
      try {
          console.log(results.title)            
      } catch (error) {
          console.log("errror getting results")
          console.log(error)
      } 
  })
})*/

module.exports = router;
