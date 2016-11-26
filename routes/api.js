/**
 * Created by YuAng on 2016-11-17.
 */

var express = require('express');
var router = express.Router();


var passport = require('passport');


//Controller section
var ctrlProfile = require('../controller/profile');
var ctrlProduct = require('../controller/products');
var ctrlReviews = require('../controller/reviews');
var ctrlAuth = require('../controller/authentication');


// Yu Ang
/*
router.get('/main',ctrlProduct.allProduct);
router.put('/artists/:id/products/:name', ctrlProfile.UpdateProduct);
router.put('/artists/:id/products/review:id', ctrlReviews.UpdateReivew);
*/

// Zi Yao
router.get('/artists?id=id',ctrlProfile.getById);
router.post('/addartist', ctrlProfile.addArtist);
router.get('/artists?lname=lname',ctrlProfile.getArtistBylastname);
router.get('/artists?country=country',ctrlProfile.getArtistByCountry);

//Ding Ren
/*
router.delete('/artist/:id/products/reviews?id=id', ctrlReviews.removeReviewbyID);

router.post('/artist/:id/products/review', ctrlProfile.addReview);
*/
// Zi Li

//router.delete('/products?name=name', ctrlProduct.removeProductbyName);

router.get('/products?name=name', ctrlProduct.getProductbyName);
router.get('/products?rtime=rtime', ctrlProduct.getProductbyReleaseTime);
/*
router.get('/artists/:id/products', ctrlProduct.getArtistProduct);
router.post('/artists/:id/product', ctrlProfile.addProduct);
*/

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



// Login in section


// send to facebook to do the authentication
router.get('/login/facebook', passport.authenticate('facebook', { scope : 'email' }));

// handle the callback after facebook has authenticated the user
router.get('/login/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/artists',
        failureRedirect : '/'
    }));


module.exports = router;
