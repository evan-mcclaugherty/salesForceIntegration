var db = require('./db/api');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local');


passport.use(new LocalStrategy((username, password, done) => {
    db.Student.findStudent(username).then((user, err) => {
        if (!user) {
            var body = {};
            var hash = bcrypt.hashSync(password, 8);
            body.username = username;
            body.password = hash;
            db.Student.addStudent(body).then(user => {
                done(null, user);
            });
        } else if (user && bcrypt.compareSync(password, user.password)) {
            done(null, user)
        } else {
            done("Error: Password is incorrect")
        }
    });
}));

module.exports = {
    passport: passport,
    isLoggedIn: (req, res, next) => {
        if (!req.session.userID) {
            res.redirect('/home');
        } else {
            next();
        }
    }
};
