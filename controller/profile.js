/**
 * Created by YuAng on 2016-11-22.
 */

//------------------Ziyao 2016-11-24----------------------------
var mongoose = require('mongoose');
var Artists = require('../model/artists.js');
var Products = mongoose.model('Products');
var Reviews = mongoose.model('Reviews');

exports.findArtists = function(req, res) {

    //var targetid = req.query.id;
    var targetfname = req.query.fname;
    var targetcountry = req.query.country;
    console.log('findAll');

    if (targetfname == undefined && targetcountry == undefined) {

        Artists.find({}, function(err, allArtists) {
            if (err) throw err;
            res.send(allArtists);
        });
    }

    else if (targetfname != undefined) {
        Artists.findOne({ familyname: targetfname }, function(err, artist) {
            if (err) throw err;

            res.send(artist);
        });

    }

    else if (targetcountry != undefined) {
        Artists.find({ country: targetcountry }, function(err, artist) {
            if (err) throw err;

            res.send(artist);
        });

    }
};



exports.addArtist = function(req, res) {
    var newArtist = new Artists({
        id: req.query.id,
        pwd: req.query.pwd,
        givenname: req.query.givenname,
        lastname: req.query.lastname,
        gender: req.query.gender,
        college: req.query.college,
        country: req.query.country,
        address: req.query.address,
        status: req.query.status,
        role: req.query.role,
        products: req.query.products
    });

    newArtist.save(function(err){
        if(err) {
            console.log(err);
            res.send({
                message :'something went wrong/ The user might exists already'
            });
        } else {
            res.send("Success");
        }
    });
};



//-----------------2016-11-24-------------------------------------------


//----------------Zili 11/24---------------------

exports.getArtistProducts = function(req, res) {

    var targetid = req.params.id;
    var productName = req.query.name;
    //var productReleaseTime = req.query.rtime;
    if (productName != undefined) {
        var review = productName.indexOf('/');
    }

    //console.log('hhhhhhhhh');
    console.log(productName);
    if (productName == undefined) {
        Artists.findOne({ id : targetid })
            .exec(function(err, artistsProducts) {
                if (err) throw err;
                res.send(artistsProducts.products);
            });
    }

    else if (productName != undefined) {
        if (review == -1) {
            Artists.findOne({ id : targetid }, function(err, artist) {
                if (err) throw err;
                if (!artist) {
                    return res.status(400).json("Error: no such artist");}

                for (index in artist._doc.products) {
                    if (artist._doc.products[index].name == productName) {
                        console.log('you');
                        res.send(artist._doc.products[index]);
                        return;
                    }

                }
                return res.status(400).json("Error: no such product");
            });
        }
        else {
            Artists.findOne({ id : targetid }, function(err, artist) {
                if (err) throw err;
                if (!artist) {
                    return res.status(400).json("Error: no such artist");}

                for (index in artist._doc.products) {
                    if (artist._doc.products[index].name == productName.substring(0, review)) {
                        console.log('you');
                        res.send(artist._doc.products[index].reviews);
                        return;
                    }

                }
                return res.status(400).json("Error: no such product");
            });
        }
    }



};




exports.findArtistById = function(req, res) {

    var targetid = req.params.id;
    //var productName = req.query.name;
    //var productReleaseTime = req.query.rtime;


    Artists.findOne({ id : targetid })
        .exec(function(err, artistsProducts) {
            if (err) throw err;
            //console.log(allBooks)
            res.send(artistsProducts);
        });



};


exports.getAllProducts = function(req, res) {
    var name = req.query.name;
    var rtime = req.query.releaseTime;
    var a = [];
    if (name == undefined && rtime == undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                res.render('main',{
                    products:a
                })
            });
    }
    else if (name != undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                for (ind in a) {
                    if (a[ind]._doc.name == name){
                        res.send(a[ind]);
                        return;
                    }
                }
                return res.status(400).json("Error: no such product");
            });
    }
    else if (rtime != undefined) {
        Artists.find({})
            .exec(function(err, allArtists) {
                if (err) throw err;
                for (index in allArtists) {
                    a = a.concat(allArtists[index]._doc.products);
                }
                for (ind in a) {
                    if (a[ind]._doc.releaseTime == rtime){
                        res.send(a[ind]);
                        return;
                    }
                }
                return res.status(400).json("Error: no such product");
            });
    }
};




exports.addArtistProduct = function(req, res) {


    var targetid = req.params.id;
    var product = new Products({
        name: req.query.name,
        description: req.query.description,
        releaseTime: req.query.releaseTime,
        onSaleStatus:req.query.onSaleStatus
    });


    Artists.update(
        { id: targetid },
        { $push: { products: product } },function(err){
            if(err) {
                console.log(err);
                res.send({
                    message :'something went wrong/ The user might exists already'
                });
            }
        }

    );

    res.send("Success");

};

exports.addProductReview = function(req, res) {


    var targetid = req.params.id;
    var name = req.params.name;
    var review = new Reviews({
        reviewID: req.query.reviewID,
        rate: req.query.rate,
        author: req.query.author,
        releaseTime: req.query.releaseTime,
        text:req.query.text
    });
    /*
    Artists.findOne((
    {
        id: targetid
    }
    )
        .exec(
            function(err, artist){
                console.log(artist);
                artist.products.name(name).reviews.push(review);
               if(err){
                    console.log(result);

               }
              // res.send("Success");
            }
        ));
    */
    Artists.update(

        {
            id:targetid,
            "products.name": name },
        { $push: { 'products.$.reviews': review } },function(err){
            console.log("haha");
            if(err) {
                console.log(err);
                res.send({
                    message :'something went wrong/ The user might exists already'
                });
            }
        }

    );



};

exports.deleteProduct = function(req, res) {
    var artistId = req.params.id;
    var productName = req.query.name;
    Artists.findOne({id: artistId}, function(err, artist) {
        if (err) throw err;

        artist.findOne({name: productName}, function(err, product) {
            if (err) throw err;

            delete product;
        })
    })
}