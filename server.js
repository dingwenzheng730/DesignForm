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

var cookieParser = require('cookie-parser');
var session = require('cookie-session');

//authentication section
var authenticate = require('./controller/authentication')(passport);
var initPassport = require('./config/passport');



var app = express();

var mongoose = require('./node_modules/mongoose');
mongoose.connect('mongodb://csc309:banana@ds047722.mongolab.com:47722/heroku_v51bxlrz');

var secret = 'secretkeyDesignform';
var hash = bcrypt.hashSync();

//Passport init
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session({
    secret: 'secretkeyDesignform'
}));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(expressValidator({
    customValidators: {

        /* Check if is password */
        isPassword: function(value) {
            var reg = /^[a-zA-Z0-9]{8,32}$/;
            return String(value).search(reg) >= 0;
        },
        isGender: function(value){

        },
        isStatus: function(value){

        },
    }

}));




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'ejs');


/// catch address error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');