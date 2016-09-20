var express = require('express');
var router = express.Router();
var localAuth = require('../auth');
var db = require('../db/api');

router.get('/', localAuth.isLoggedIn, function(req, res, next) {
    res.render('track');
});

router.post('/', localAuth.isLoggedIn, function(req, res, next) {
    db.Book.insertBook(req.body).then(data => {
        db.Student.findStudent(req.session.username).then(studentId => {
            db.StudentBooks.insertStudentBooks(data.id, studentId.id).then(success => {
                var info = {
                    bookName: data.bookID.id || data.bookID,
                    studentName: studentId.objectID,
                    minutes: req.body.minutes,
                    day: req.body.day
                }

                return db.StudentBooks.insertSalesForceStudentBooks(info).then(update => {
                    res.redirect('stats');
                });

            })
        })
    })
})





module.exports = router;
