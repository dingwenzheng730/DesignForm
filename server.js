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
var passport = require('passport');

//var authenticate = require('./routes/authentication')(passport);
//var initPassport = require('./passport-init');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');


var app = express();
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');