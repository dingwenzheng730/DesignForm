/**
 * Created by YuAng on 2016-11-22.
 */

var express = require('express');
var router = express.Router();

module.exports = function(passport) {


    // Google login
    router.get('/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));
    // Google login callback
    router.get('/google/callback', passport.authenticate('google', {
        successRedirect: '/artists',
        failureRedirect: '/'
    }));

    //Facebook login
    router.get('/auth/facebook', passport.authenticate('facebook',
        { scope : 'email'
        }));

    // Facebook login callback
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/artists',
            failureRedirect : '/'
        }));


};