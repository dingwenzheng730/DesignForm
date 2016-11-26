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
/*
var authenticate = require('./controller/authentication')(passport);
var initPassport = require('./config/passport');
*/


var app = express();



var secret = 'secretkeyDesignform';
//var hash = bcrypt.hashSync();


app.engine('.html', require('ejs').__express);


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.set('views', __dirname);
app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.render('./view/index.html', {
        errors: ''
    });
});






// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//app.set('views', path.join(__dirname, '/public/views'));

app.get('/', function(req, res) {
    res.render('../view/index.html', {
        errors: ''
    });
});
/*
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
*/

module.exports = routes;

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');
