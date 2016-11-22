/**
 * Created by YuAng on 2016-11-14.
 */

'use strict';

// Make sure to install these dependencies!
// Instructions are in the README.
var express = require('express');
var router = express.Router();
var passport = require('passport');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var mongoose = require('./node_modules/mongoose');
var Auth0Strategy = require('passport-auth0');

//var authenticate = require('./routes/authentication')(passport);
//var initPassport = require('./passport-init');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var ctrlProfile = require('../controller/profile');
var ctrlReviews = require('../controller/reviews');
var ctrlAuth = require('../controller/authentication');

var app = express();


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(cookieParser('notsosecret'));
app.use(session({
    secret: 'notsosecretkey123'
}));
app.use(passport.initialize());
app.use(passport.session());
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

// Yu Ang
router.post('/artist', routes.getArtist);
//PUT  undecided
// ZI Yao
router.get('/artists/:id',ctrlProfile.getById);
//router.post('/artists/:id', ctrlProfile.addApplicants);
router.get('/artists?lname=lname',ctrlProfile.getArtistBylastname);
router.get('/artists?country=country',ctrlProfile.getArtistBylastname);

//Zi Li
router.post('/artists/reviews/:reviewid', ctrlReviews.addreview);
router.post('/artist/:id/products/:name', ctrlProfile.addProduct);
router.delete('/artist/:id/reviews', ctrlReviews.removeReviewbyName);
// Ding Ren
router.delete('/artist/:id/products/:name', routes.removeProductbyName);
router.get('/artists/:id/products?name=name', routes.getProductbyName);
router.get('/artists/:id/products?rtime=rtime', routes.getProductbyReleaseTime);



// Login in section
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000');