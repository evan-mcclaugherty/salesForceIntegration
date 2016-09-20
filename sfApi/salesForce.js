require('dotenv').config();

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
    oauth2: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://localhost'
    }
});
conn.login(process.env.USERNAME, process.env.PASSWORD, function(err, userInfo) {
    if (err) {
        return console.error(err);
    }
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
});



module.exports = conn;
