/**
 * Created by YuAng on 2016-11-22.
 */

//------------------Ziyao 2016-11-24----------------------------
var mongoose = require('mongoose');
var Artists = require('../model/artists.js');
var Products = mongoose.model('Products');
var Reviews = mongoose.model('Reviews');
//var Picture = mongoose.model('Picture');
var fs = require('fs');


var sendJsonRes = function(res, status, content){
    res.status(status);
    res.json(content);
};


var imgPath = './img/tiger.jpg';





/**
 * Created by YuAng on 2016-11-22.
 */


exports.editArtists = function(req, res) {

    var userName = req.query.username;

    if (targetid != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var artists = new Array();
                artists.push(artist);
                res.render("edit", {persons: artists});
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }
};

exports.deleteArtist = function(req, res) {
    Artists.findOneAndRemove({ username: req.query.username }, function(err) {
        if (err) throw err;

        // we have deleted the user
        console.log('User deleted!');
    });
};

exports.updateArtist = function(req, res) {
    Artists.findOneAndUpdate({ username: req.query.username},
        { givenname: req.query.givenname, lastname: req.query.lastname,
            gender: req.query.gender, country: req.query.country,
            status: req.query.status, role: req.query.role
        }, function(err, user) {
            if (err) throw err;
        });
};

exports.findArtists = function(req, res) {

    var userName = req.query.username;
    var targetfname = req.query.fname;
    var targetcountry = req.query.country;

    if (userName == undefined && targetfname == undefined && targetcountry == undefined) {
        Artists.find({}, function(err, allArtists) {
            if (err) throw err;
            res.render("search", {persons: allArtists});
        });
        return 0;
    }

    if (userName != undefined) {
        Artists.findOne({ username: userName }, function(err, artist) {
            if (artist != null) {
                if (err) throw err;
                var artists = new Array();
                artists.push(artist);
                res.render("search", {persons: artists});
                //res.send(artist);
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }

    if (targetfname != undefined) {
        Artists.find({ lastname: targetfname }, function(err, artists) {
            if (artists[0] != null) {
                if (err) throw err;
                res.render("search", {persons: artists});
                //res.send(artist);
                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }

    if (targetcountry != undefined) {
        Artists.find({ country: targetcountry }, function(err, artists) {
            if (artists[0] != null) {
                if (err) throw err;
                res.render("search", {persons: artists});

                return 0;
            } else {
                res.render("fail_search");
                return -1;
            }
        });
    }

};



exports.addArtist = function(req, res) {

    var id = req.body["email"];
    var email = req.body["email"];
    var givenname = req.body["givenname"];
    var lastname = req.body["lastname"];
    var gender = req.body["gender"];
    var pwd = req.body["password"];

    var target = '{ "id": "' + id +'", "pwd": "' + pwd +'", "givenname": "' +
        givenname + '", "lastname": "' + lastname + '", "gender": "' +
        gender + '", "email": "' + email + '", ' + '"country": "China",  "status": "", '+
        '"role": "", "products": []}' ;


    var newArtist = new Artists(JSON.parse(target));


    newArtist.save(function(err){
        if (err) throw err;
        res.render('login');
    });
};



//-----------------2016-11-24-------------------------------------------


//----------------Zili 11/24---------------------

exports.getArtistProducts = function(req, res) {

    var userName = req.params.username;
    var productName = req.query.name;
    if (productName != undefined) {
        var review = productName.indexOf('/');
    }


    console.log(productName);
    if (productName == undefined) {
        Artists.findOne({ id : userName })
            .exec(function(err, artistsProducts) {
                if (err) throw err;
                res.send(artistsProducts.products);
            });
    }

    else if (productName != undefined) {
        if (review == -1) {
            Artists.findOne({ id : userName }, function(err, artist) {
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
            Artists.findOne({ id : userName }, function(err, artist) {
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



    Artists.findOne({ id : targetid })
        .exec(function(err, artistsProducts) {
            if (err) throw err;

            res.send(artistsProducts);
        });

};


exports.getAllProducts = function(req, res) {
    var name = req.query.name;
    var rtime = req.query.releaseTime;
    var a = [];
    //var b = [];
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

     var image = new Picture({
     img : {
     data:fs.readFileSync(imgPath),
     contentType:'image/jpg'
     }});

    var name = req.params.username;
    console.log(name);
    var product = new Products({
        name: req.query.name,
        description: req.query.description,
        releaseTime: req.query.releaseTime,
        onSaleStatus:req.query.onSaleStatus,
        picture:image
    });


    Artists.update(
        { username: name },
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
    Artists.update(
        {
            id:targetid,
            "products.name": name },
        { $push: { 'products.$.reviews': review } },function(err){
            if(err) {
                console.log(err);
                res.send({
                    message :'something went wrong/ The user might exists already'
                });
            }
        }

    );
};

exports.UpdateReview = function(req, res) {
    var artid = req.params.id;
    var reviewid = req.params.reviewid;
    var pname = req.params.name;

    Artists.collection.update(
        {"id":artid, "products.name":pname},
        {
            $set: {"products.$.reviews":{
                rating: req.query.rating,
                author: req.query.author,
                releaseTime: req.query.releaseTime,
                text: req.query.text}}
        },
        { multi : true },
        function updateConnect(){
            if(err){
                console.log(err);
                sendJsonRes(res, 404, err);

            }
        }
    );

};
exports.deleteProduct = function(req, res) {
    var artistId = req.params.id;
    var productName = req.query.name;
    Artists.update(
        { id: artistId },
        { $pull: { products : { name : productName } } },
        { safe: true },
        function removeConnectionsCB(err,obj) {
            if(err){
                sendJsonRes(res, 404, err);
                return;
            }
            res.send({
                message :'Good'
            });
            console.log(obj);
        }
    );

};

exports.deleteProductReview = function(req, res) {

    var artID = req.params.id;
    var pName = req.params.name;
    var reviewID = req.query.reviewID;

    Artists.collection.update(
        {"id":artID,"products.name":pName},
        { $pull: {"products.$.reviews":{reviewID: reviewID}}},
        { multi : true },
        function removeConnectionsCB(err,obj) {
            if(err){
                sendJsonRes(res, 404, err);

                return;
            }
            res.send({
                message :'Successfully deleted the specified review'
            });
            console.log(obj);

        }
    );
};


