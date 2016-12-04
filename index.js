var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ctrlArtist = require('./controller/profile');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var logger = require('morgan');
var bCrypt = require('bcrypt-nodejs');

var path = require('path');


var session = require('express-session');
var flash = require('connect-flash');

var fs = require('fs');
//authentication section
require('./config/passport')(passport);


var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'view')));

app.use(passport.initialize());
app.use(passport.session());

var secret = 'secretkeydesignform';

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.pwd);
};
// Generates hash using bCrypt
var encrypted = createHash(secret);
function isLoggedIn(req,res,next){
    console.log(req);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.use(function(req,res,next){
   res.locals.person = req.artist;
    next();
});
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
    res.render('login.ejs',{
        message: req.flash('info',"Please Sign in"),
        loggedin: undefined
    });
});
app.engine('.html', require('ejs').__express);

// go to a user's home page, profile and gallery
app.get('/gallery',ctrlArtist.findGallery);
app.get('/user_home', ctrlArtist.findHome);
app.get('/profile', ctrlArtist.findProfile);
app.get('/addproduct', ctrlArtist.addproductpage);

app.get('/artists',ctrlArtist.findArtists);

app.get('/main',ctrlArtist.getAllProducts);
app.put('/artists/:username/product:name/review', isLoggedIn,ctrlArtist.UpdateReview);


app.get('/artists/:username', ctrlArtist.findArtists);


app.delete('/artists/:username/product/:name/review', ctrlArtist.deleteProductReview);
app.post('/artists/:username/product',ctrlArtist.deleteProduct);

app.post('/add_product',ctrlArtist.addArtistProduct);
//app.post('/artist/:username/product/:name/review',ctrlArtist.addProductReview);



app.post('/artist', ctrlArtist.addArtist);

app.delete('/artists',ctrlArtist.deleteArtist);
app.get('/edit_artist',ctrlArtist.editArtists);
app.get('/updateartists',ctrlArtist.updateArtist);


app.get("/product", ctrlArtist.getArtistProducts);
app.get("/productbyname", ctrlArtist.getProductByName);





//app.get('/addproduct', function(req, res) {
  //  res.render("add_product.ejs");

//});
//app.post('/register', ctrlArtist.addArtist);

app.get('/login', function(req,res) {
    res.render('login',{ message: req.flash('loginMessage','Hello') });
});

app.get('/add_review', function(req,res) {
    res.render('add_review');
});


app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, artist, info) {

        if (err) { return next(err); }
        if (!artist) { return res.render('login.ejs',{ message: req.flash('loginMessage','User Not Found') }); }
        req.logIn(artist, function(err) {
            if (err) {
                console.log(artist);
                return next(err);
            }
            if(isValidPassword(artist.person,encrypted) && artist.username == 'admin'){
                return res.redirect('/admin_home',{message:req.flash('info','Welcome admin! ')});
            }
            return res.redirect('/gallery?username=' + artist.person.username);
        });
    })(req, res, next);
});

    /*
    passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash : true // flash messages that indicates error login
}));
*/

app.get('/register', function(req, res) {
    res.render('register.ejs',{ message: req.flash('signupMessage'), loggedin: undefined });
});

app.post('/register', function(req, res, next) {
    passport.authenticate('local-signup', function (err, artist, info) {

        if (err) {

            return next(err);
        }
        if (!artist || artist == false) {
            return res.render('login.ejs', {message: req.flash('loginMessage', 'User Not Found')});
        }
        req.logIn(artist, function (err) {
            console.log(artist);
            if (err) {
                return next(err);
            }
            return res.redirect('/gallery?username=' + artist.person.username);
        });
    })(req, res, next);
});

/*
    passport.authenticate('local-signup', {

    successRedirect: '/main',
    failureRedirect: '/login',
    successFlash: 'Welcome!',
    failureFlash : true //  flash messages that indicates error login
}));
*/

//Facebook login
app.get('/auth/facebook', passport.authenticate('facebook',
    { scope : 'email'

    }));

// Facebook login callback
app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function (err, artist, info) {
        console.log(req);

        if (err) {

            return next(err);
        }
        if (!artist || artist ==false) {
            return res.render('login',{ message: 'Duplicate key'});
        }
        req.logIn(artist, function (err) {
            console.log(artist);
            if (err) {
                return next(err);
            }
            return res.redirect('/user_home?username=' + artist.person.username);
        });
    })(req, res, next);
});

//Already logged in

app.get('/connect/local', function(req, res) {
    res.render('main.ejs', { message: req.flash('info',"Welcome to DeisignForm ! ") });
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

app.get("/logout",function(req,res){

    req.logout();
    res.redirect("/main");
});


// Start the server
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


/*
app.get("/secert",isLoggedin, function(req,res){
    res.render("/login");
});

*/
