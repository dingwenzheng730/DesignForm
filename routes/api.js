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
router.post('/artists/artist', routes.addArtist);
router.put('/artists/:id', ctrlReviews.UpdateArtist);


// Zi Yao
router.get('/artists/:id',ctrlProfile.getById);
router.post('/artists/:id', ctrlProfile.addApplicants);
router.get('/artists?lname=lname',ctrlProfile.getArtistBylastname);
router.get('/artists?country=country',ctrlProfile.getArtistBylastname);

//Zi Li
router.put('/artists/reviews/:reviewid', ctrlReviews.addReview);
router.post('/artist/:id/products/:name', ctrlProfile.addProduct);
router.delete('/artist/:id/reviews', ctrlReviews.removeReviewbyName);

// Ding Ren
router.delete('/artists/:id/products/:name', ctrlProfile.removeProductbyName);
router.get('/artists/:id/products?name=name', ctrlProfile.getProductbyName);
router.get('/artists/:id/products?rtime=rtime', ctrlProfile.getProductbyReleaseTime);



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