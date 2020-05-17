const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/user');
const Review = require('../models/review');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Search Bar
router.post('/', (req, res) => {
    const searchInput = req.body.search;
    Review.find({ title: new RegExp(escapeRegex(searchInput), 'gi') }, function(err, posts) {
        console.log(posts);
        if(err || posts.length == 0){
            res.redirect('/dashboard');
        }else{
        var users = [];
        for (var i = 0; i < posts.length; i++) {
            User.findById(posts[i].user_id, (err, userInfo) => {
                users.push(userInfo);
                //console.log(users);
                if(users.length == posts.length){
                    res.render('search.ejs', {
            
                        posts: posts,
                        students: users,
                        authenticated: ensureAuthenticated
                    })
                }
            })
           }
        //console.log(users)
        }
    });
});

module.exports = router;