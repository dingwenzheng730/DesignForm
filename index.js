var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ctrlArtist = require('./controller/profile');
var ctrlProduct = require('./controller/products');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var logger = require('morgan');
var path = require('path');

var session = require('express-session');
var flash = require('connect-flash');
//var Picture = mongoose.model('Picture');
var fs = require('fs');
//authentication section
require('./config/passport')(passport);


var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'view')));

app.use(passport.initialize());
app.use(passport.session());

var secret = 'secretkeyDesignform';



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.use(session({ cookie: { maxAge: 60000 },
    secret: secret,
    resave: false,
    saveUninitialized: false}));

app.use(cookieParser());
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(flash());
// Get the index page:
app.get('/', function(req, res) {
    res.render('login',{
        message: req.flash(),
        loggedin: undefined
    });
});
app.engine('.html', require('ejs').__express);

// load the register page and register a user
app.get('/register', function(req,res){
    res.render('register');
});
app.post('/register', ctrlArtist.addArtist);

// go to a user's home page, profile and gallery
app.get('/gallery', ctrlArtist.findGallery);


app.get('/artists', ctrlArtist.findArtists);

app.get('/main', ctrlArtist.getAllProducts);
app.put('/artists/:username/product:name/review', ctrlArtist.UpdateReview);

app.get('/artists',ctrlArtist.findArtists);
app.get('/artists/:username', ctrlArtist.findArtists);


app.delete('/artists/:username/product/:name/review', ctrlArtist.deleteProductReview);
app.delete('/artists/:username/product', ctrlArtist.deleteProduct);
app.post('/artist/:username/product', ctrlArtist.addArtistProduct);
app.post('/artist/:username/product/:name/review', ctrlArtist.addProductReview);
app.post('/artist', ctrlArtist.addArtist);

app.delete('/artists', ctrlArtist.deleteArtist);//ok
app.get('/edit_artists', ctrlArtist.editArtists);//ok
app.get('/updateartists', ctrlArtist.updateArtist);//






app.post('/register', ctrlArtist.addArtist);

app.get('/login', function(req,res) {
    res.render('login.ejs',{ message: req.flash('loginMessage'), loggedin: undefined })
});

app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash : true // flash messages that indicates error login
}));


app.get('/signup', function(req, res) {
    res.render('register.ejs');
});

app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/main',
    failureRedirect: '/login,',
    failureFlash : true //  flash messages that indicates error login
}));


//Facebook login
app.get('/auth/facebook', passport.authenticate('facebook',
    { scope : 'email'

    }));

// Facebook login callback
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/main',
        failureRedirect : '/auth/failure'
    }));


//Already logged in

app.get('/connect/local', function(req, res) {
    res.render('profile.ejs', { message: req.flash('loginMessage') });
});
app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : 'main', // redirect to the secure profile section
    failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
    failureFlash : true // flash messages that indicates error login
}));

// facebook -------------------------------

// send to facebook to do the authentication
app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

// handle the callback after facebook has authorized the user
app.get('/connect/facebook/callback',
    passport.authorize('facebook', {
        successRedirect : 'main.ejs',
        failureRedirect : '/'
    }));

app.get('/profile', function(req,res){
    res.render('profile');
});
app.get('/admin_home', function(req,res){
    res.render('admin_home');
});
app.get('/edit', function(req,res){
    res.render('edit');
});
// Start the server
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
