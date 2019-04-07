const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var user = require('../models/user');
var review = require('../models/review');


router.use('/assets', express.static('assets'));

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));



// Post a Review Page
router.get('/review', ensureAuthenticated, (req, res) => res.render('reviews.js'));


// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  //posts = [];
  userdata = req.user;
review.find({user_id: req.user._id.toString()}, (req, posts)=>{
  res.render('dashboard', {
    user: userdata,
    posts: posts
  })
})

});

// Welcome Page
router.post('/desc', ensureAuthenticated, (req, res) => user.updateOne({ _id: req.session.passport.user }, {
  $set: { description: req.body.newDesc }
}, function (err, numberAffected, rawResponse) {
  if (err) {
    console.log('new profile update error');
  } else {
    // Dashboard
    res.redirect('/dashboard');
  }
})
);



module.exports = router;
