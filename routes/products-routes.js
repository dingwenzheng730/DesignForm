var fs = require('fs');
var Product = require('../models/product');;

//sort by product name
function pnamesort(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

console.log("Success:");

//add product
exports.addProduct = function(req, res) {
    console.log("addProduct");
    console.log(req.body);
    var newProduct = new Product(req.body);

    newProduct.save(function(err, newProduct) {
        if (err) throw err;
        res.send('Success');
    })
};



//delete one product
exports.removeProductbyName = function(req, res) {
    var productname = req.query.name;
    var a = Product['products'].length;
    for(i = 0; i < productObj['products'].length; i++) {
        if (Product['products'][i].name.toUpperCase() == productname.toUpperCase()) {
            Product['products'].splice(i,1);
        }
    }
    var b = Product['products'].length;
    if (a == b) {
        res.send("Error: no such product");
    }
    else {
        res.send("Success");
    }
};


//get product by name
exports.getProductbyName = function(req, res) {
    var temp;
    var productname = req.query.name;
    var productObj = JSON.parse(JSON.stringify(Product));
    //productObj['name'].sort(pnamesort);

    //by family name
    if (productname != undefined){
        for(i = 0; i < productObj['products'].length; i++) {
            if (productObj['products'][i].name.toUpperCase() == productname.toUpperCase()) {
                temp = productObj['products'][i];
            }
        }
    }
    res.send(temp);
};

