var express = require('express');
var bodyParser = require('body-parser');

var artists = require('./controller/profile');
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

app.get('/artists', artists.findArtists);


/*
//app.get('/products', products.getProducts);
router.get('/main',ctrlProduct.allProduct);
router.put('/artists/:id/products/:name', ctrlProfile.UpdateProduct);
router.put('/artists/:id/products/review:id', ctrlReviews.UpdateReivew);
 router.delete('/products?name=name', ctrlProduct.removeProductbyName);

 router.get('/products?name=name', ctrlProduct.getProductbyName);
 router.get('/products?rtime=rtime', ctrlProduct.getProductbyReleaseTime);
 router.get('/artists/:id/products', ctrlProduct.getArtistProduct);
 router.post('/artists/:id/product', ctrlProfile.addProduct);
*/

app.get('/login', function(req,res){
	res.render('login');
});
app.get('/register', function(req,res){
	res.render('register');
});
app.get('/profile', function(req,res){
	res.render('profile');
});

//app.get('/products', products.getProducts);
app.engine('.html', require('ejs').__express);



// Start the server
app.listen(3000);
console.log('Listening on port nmb3000');
