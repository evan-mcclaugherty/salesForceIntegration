var express = require('express');
var router = express.Router();
var localAuth = require('../auth');
var db = require('../db/api');

/* GET users listing. */




router.get('/', localAuth.isLoggedIn, function(req, res, next) {
    db.Student.queryStudents(req.session.username).then(data =>{
        res.render('stats', {data: data});
    })
});


module.exports = router;
