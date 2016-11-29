/**
 * Created by YuAng on 2016-11-22.
 */


var mongoose = require('mongoose');
var Artists = mongoose.model('Artists');




var sendJsonRes = function(res, status, content){
    res.status(status);
    res.json(content);
};

var pushReview = function(req, res, product, artist){
    product.reviews.push({
        rating: req.body.rating,
        author: artist,
        releaseTime:req.body.releaseTime,
        text: req.body.text
    });
    product.save(function(err, product){
        var review;
        if(err){
            sendJsonRes(res, 400, err);
        }else{
            updateAveRating(product.id);
            review = product.reviews[product.reviews.length - 1];
            sendJsonRes(res, 201, review);
        }
    })
};

exports.addReview = function(req, res){
    FindArtist(req, res, function(req, res, artistID){
        if(req.params.name){
            Products.findById(req.params.name)
                .select("reviews")
                .exec(function(err, product){
                    if(err){
                        sendJsonRes(res, 404, err);
                    }else{
                        pushReview(req, res, product, artistID);
                    }
                })
        }else{
            sendJsonRes(res, 404, {
                "message": "Found no missionid in params"
            })
        }
    });
};

var FindArtist = function(req, res, callback) {
    console.log("Finding author with id " + req.body.id);
    if (req.payload.email) {
        Artists
            .findOne({ id : req.payload.id })
            .exec(function(err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "User not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(user);
                callback(req, res, user.name);
            });

    } else {
        sendJsonRes(res, 404, {
            "message": "User not found"
        });

    }

};

exports.removeReviewbyID = function(req, res) {
    var artID = req.params.id;
    var reviewid = req.query;
    User.find({'links.url':req.params.query}, function(err, foundUsers){
        // ---
    });

    Artists.findOne({ id: artID })
               .forEach(function(eachproduct){
                   for(var i=0;  i< eachproduct.products.length; i++){
                    eachproduct.products.findOne( { id: reviewid}, function(err, review){

                           if (err) throw err;

                           console.log("remove review by id successfully find review.");

                         eachproduct.products.indexOf(i).reviews.remove(function(err) {
                               if (err )throw err;
                               console.log("review successfully removed by id");
                           })

                       } )
                   }
               });
};
