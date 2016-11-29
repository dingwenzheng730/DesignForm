var express = require('express');
var bodyParser = require('body-parser');

var ctrlArtist = require('./controller/profile');
var ctrlProduct = require('./controller/products');
var passport = require('passport');
var expressValidator = require('express-validator');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

//authentication section
 var authenticate = require('./controller/authentication')(passport);
 var initPassport = require('./config/passport');


require('./config/passport')(passport);
var app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'view')));

app.use(passport.initialize());
app.use(passport.session());

var secret = 'secretkeyDesignform';
//var hash = bcrypt.hashSync();


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
    res.render('main');
});
app.engine('.html', require('ejs').__express);

app.get('/artists', ctrlArtist.findArtists);



app.get('/main', ctrlArtist.getAllProducts);

//app.get('/main/:id', ctrlArtist.getAllProducts);
/*s
router.put('/artists/:id/products/:name', ctrlProfile.UpdateProduct);
router.put('/artists/:id/products/review:id', ctrlReviews.UpdateReivew);
 router.delete('/products?name=name', ctrlProduct.removeProductbyName);


 router.get('/artists/:id/products', ctrlProduct.getArtistProduct);

*/
//app.delete('/artists/:id/product?name=name',ctrlArtist.addArtistProduct);
app.post('/artist/:id/product', ctrlArtist.addArtistProduct);
app.post('/artist/:id/product/:name/review', ctrlArtist.addProductReview);
app.post('/artist', ctrlArtist.addArtist);

app.get('/register', function(req,res){
	res.render('register');
});
app.get('/artists',ctrlArtist.findArtists);
app.get('/artists/:id', ctrlArtist.findArtists);

//app.get('/products', products.getProducts);
app.get('/login', function(req,res) {
    res.render('login.ejs', { message: req.flash('loginMessage')
    })
});

app.post('/login', passport.authenticate('login', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));
app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
}));


//Facebook login
app.get('/auth/facebook', passport.authenticate('facebook',
    { scope : 'email'

    }));

// Facebook login callback
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/artsts',
        failureRedirect : '/auth/failure'
    }));


// Start the server
app.listen(3000);
console.log('Listening on port nmb3000');
