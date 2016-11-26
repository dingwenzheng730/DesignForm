/**
 * Created by YuAng on 2016-11-22.
 */
var Products = require('../model/products.js');

console.log("Success:");






var sendJsonRes = function(res, status, content){
	res.status(status);
	res.json(content);
};



//add product
exports.addProduct = function(req, res) {
  //  var newProduct = new Product(req.body);
    var newProduct = new Product({
    });

    newProduct.save(function(err, newProduct) {
        if (err) throw err;
        res.send('Success');
    })
};


//delete one product
exports.removeProductbyName = function(req, res) {
    if(!req.params.id){
        sendJsonRes(res, 404, {
            "message": "Found no id in request URL"
        });
        return;
    }
    Products
        .findById(req.params.id)
        .exec(function(err, product){
        if(!product){
            sendJsonRes(res, 404, {
                "message": "Found no match"
            })
        }
        else if(err){
            sendJsonRes(res, 404, err);
        }
        Products.remove(function(err, product){
        if(err){
            console.log(err);
            return;
        }
        sendJsonRes(res, 204, null);
        })
})};



//get product by name (global search)
exports.getProductbyName = function(req, res) {
    var productName = req.query.name;
    console.log(productName);
    Products.findOne({ name: productName }, function(err, product) {
	if (err) throw err;

	res.send(product);
    });

};

//get product by release time (global search)
exports.getProductbyReleaseTime = function(req, res) {
    var productReleaseTime = req.query.rtime;
    Products.findOne({ releaseTime: productReleaseTime }, function(err, product) {
	if (err) throw err;

	res.send(product);
    });

};
