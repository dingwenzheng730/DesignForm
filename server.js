/**
 * Created by YuAng on 2016-11-14.
 */

'use strict';

// Make sure to install these dependencies!
// Instructions are in the README.
var express = require('express');
var passport = require('passport');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('./node_modules/mongoose');
var Auth0Strategy = require('passport-auth0');

//var authenticate = require('./routes/authentication')(passport);
//var initPassport = require('./passport-init');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');



var app = express();

app.use(passport.initialize());
app.use(passport.session());
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');





module.exports = router;

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');