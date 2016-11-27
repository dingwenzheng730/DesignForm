var express = require('express');
var bodyParser = require('body-parser');

var artists = require('./controller/profile');
//var products = require('./controller/products');
var app = express();

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
