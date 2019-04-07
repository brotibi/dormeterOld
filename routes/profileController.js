const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var user = require('../models/user');

var user;

router.use('/assets', express.static('assets'));

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Getting the string of the webpage
router.get('/:name', function (req, res) {
    //res.send(req.params);
    username = req.params;
    // console.log(user.findOne({'name': username.name}, 'name').name);
    user.findOne(username, 'name university description', (err, person) => {
        if (err) return handleError(err);
        //console.log(person.university);
        if (person === null) {
            res.redirect('/dashboard');
        } else {
            res.render('profile.ejs', {
                student: person
            })
        }
    });
});

module.exports = router;