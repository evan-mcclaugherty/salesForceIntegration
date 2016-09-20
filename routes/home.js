var express = require('express');
var router = express.Router();
var request = require('request');
var localAuth = require('../auth');
require('dotenv').config();

router.get('/', function(req, res, next) {
    req.session.userID = null;
    res.render('home');
});

router.post('/login', function(req, res) {
    localAuth.passport.authenticate('local', (err, user) => {
        if (err) {
            res.render('home', {
                error: err
            });
        } else if (user) {
            req.session.userID = user.id;
            req.session.username = user.username;
            req.session.objectID = user.objectID;
            res.redirect('/track');
        }
    })(req, res);
});

module.exports = router;
