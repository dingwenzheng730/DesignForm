/**
 * Created by YuAng on 2016-11-22.
 */


var mongoose = require('mongoose');
var Artists = mongoose.model('Artists');
var Products = mongoose.model('Products');
var User = mongoose.model('User');



var sendJsonRes = function(res, status, content){
    res.status(status);
    res.json(content);
};

var addReview = function(req, res, product, artist){
    product.reviews.push({
        rating: req.body.rating,
        author: artist,
        releaseTime:req.body.releaseTime,
        text: req.body.text
    });
    product.save(function(err, mission){
        var thisReview;
        if(err){
            sendJsonRes(res, 400, err);
        }else{
            updateAveRating(mission._id);
            thisReview = mission.reviews[mission.reviews.length - 1];
            sendJsonRes(res, 201, thisReview);
        }
    })
};

module.exports.reviewsCreate = function(req, res){
    getAuthor(req, res, function(req, res, userName){
        if(req.params.missionid){
            Products.findById(req.params.missionid)
                .select("reviews")
                .exec(function(err, product){
                    if(err){
                        sendJsonRes(res, 404, err);
                    }else{
                        addRiview(req, res, product, userName);
                    }
                })
        }else{
            sendJsonRes(res, 404, {
                "message": "Found no missionid in params"
            })
        }
    });
};

var getAuthor = function(req, res, callback) {
    console.log("Finding author with email " + req.payload.email);
    if (req.payload.email) {
        User
            .findOne({ email : req.payload.email })
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
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }

};