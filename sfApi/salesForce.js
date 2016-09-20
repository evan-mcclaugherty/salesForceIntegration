require('dotenv').config();

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
    oauth2: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI
    }
});
conn.login(process.env.USERNAME, process.env.PASSWORD, function(err, userInfo) {
    if (err) {
        return console.error(err);
    }
});



module.exports = conn;

REDIRECT_URI
