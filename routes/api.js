/**
 * Created by YuAng on 2016-11-17.
 */

var express = require('express');
var router = express.Router();


var passport = require('passport');


//Controller section
var ctrlProfile = require('../controller/profile');
var ctrlReviews = require('../controller/reviews');
var ctrlAuth = require('../controller/authentication');


// Yu Ang
router.put('/artists/:id/products/:name', ctrlProfile.UpdateProduct);
router.put('/artists/:id/products/review:id', ctrlReviews.UpdateReivew);


// Zi Yao
router.get('/artists/:id',ctrlProfile.getById);
router.post('/artists/:id', ctrlProfile.addArtist);
router.get('/artists?lname=lname',ctrlProfile.getArtistBylastname);
router.get('/artists?country=country',ctrlProfile.getArtistByCountry);

//Ding Ren

router.delete('/artist/:id/products/reviews?id=id', ctrlReviews.removeReviewbyID);
router.put('/artists/:id', ctrlReviews.UpdateArtist);
router.post('/artist/:id/products/review', ctrlProfile.addReview);

// Zi Li
router.delete('/artists/:id/products?name=name', ctrlProfile.removeProductbyName);
router.get('/artists/:id/products?name=name', ctrlProfile.getProductbyName);
router.get('/artists/:id/products?rtime=rtime', ctrlProfile.getProductbyReleaseTime);
router.post('/artist/:id/product', ctrlProfile.addProduct);


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



// Login in section
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
// send to facebook to do the authentication
router.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/artists',
        failureRedirect : '/'
    }));


module.exports = router;
