const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var user = require('../models/user'); 


router.use('/assets', express.static('assets'));

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Post a Review Page
router.get('/users/review', ensureAuthenticated, (req, res) => res.render('review.ejs'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

// Welcome Page
router.post('/desc', ensureAuthenticated,(req, res) => user.updateOne({_id: req.session.passport.user}, {
  $set: {description: req.body.newDesc} 
},function(err, numberAffected, rawResponse) {
  if(err) {
    console.log('new profile update error');
  } else {
    // Dashboard
    res.redirect('/dashboard');
  }
})
);



module.exports = router;
