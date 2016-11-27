var express = require('express');
var bodyParser = require('body-parser');

var artists = require('./controller/profile');
//var products = require('./controller/products');
var app = express();


app.use(express.static(__dirname + '/'));

// The request body is received on GET or POST.
// A middleware that just simplifies things a bit.
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Get the index page:
app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/artists', artists.findArtists);

//app.get('/products', products.getProducts);



// Start the server
app.listen(3000);
console.log('Listening on port nmb3000');
