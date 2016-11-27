/**
 * Created by YuAng on 2016-11-14.
 */

'use strict';


var express = require('express');
var routes = require('./routes/api');
var passport = require('passport');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

//authentication section
/*
var authenticate = require('./controller/authentication')(passport);
var initPassport = require('./config/passport');
*/

require('./config/passport')(passport);
var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'view')));

app.use(passport.initialize());
app.use(passport.session());

var secret = 'secretkeyDesignform';
//var hash = bcrypt.hashSync();


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.set('views', __dirname);
app.set('view engine', 'html');






app.get('/', function(req, res) {
    res.render('../view/index.html', {
        errors: ''
    });
});


module.exports = app;

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
