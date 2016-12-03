/**
 * Created by YuAng on 2016-11-22.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var generator = require('generate-password');
var FacebookStrategy = require('passport-facebook').Strategy;

var Artists = mongoose.model('Artists');

var flash = require('connect-flash');

var LocalStrategy = require('passport-local').Strategy;

var bCrypt = require('bcrypt-nodejs');

var FACEBOOK_CONSUMER_KEY = '1006730306139581', FACEBOOK_CONSUMER_SECRET = 'ef44eadbcb4598df5eccb8cbc2e7c5b5';

module.exports = function (passport) {

    passport.serializeUser(function(artist, done) {
       // console.log(artist);
        done(null, artist);
    });

    // used to deserialize the user
    passport.deserializeUser(function(artist,done){
       // console.log(artist);
            done(null, artist);
    });
// Local login
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            username : 'username',
            password : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // asynchronous

            process.nextTick(function() {
                Artists.findOne({ 'username' :  username }, function(err, artist) {
                    // if there are any errors, return the error
                    console.log(artist);
                    console.log(password);
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!artist)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));
/*
                    if (!isValidPassword(artist,password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
*/
                    // all is well, return user
                    else
                        //console.log("ok");
                        return done(null, artist);
                });
            });
        }));


    passport.use('local-signup', new LocalStrategy({
            username : 'username',
            password : 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, userID, password, done) {

            // find a user in mongo with provided username
            Artists.findOne({'username': userID}, function (err, artist) {

                if (err) {
                    console.log('SignUp Error: ' + err);
                    return done(err);
                }
                //The artist already exists in the database
                if (artist) {

                    return done(null, false, req.flash('signupMessage', 'This '));
                } else {
                    // if there is no user, create the user
                    var newArtist = new Artist();
                    console.log(req.body);
                    // Set credentials
                    newArtist.username = artist.username;
                    newArtist.pwd = createHash(artist.pwd);
                    newArtist.givenName = artist.givenName;
                    newArtist.familyName = artist.familyName;
                    newArtist.email = artist.email;

                    // save the user
                    newArtist.save(function (err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                       // console.log(newArtist.username + ": " + newArtist.givenname + "  " + newArtist.familyName + ' Registration succesful');
                        return done(null, newArtist);
                    });
                }
            });
        })
    );

    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_CONSUMER_KEY,
            clientSecret: FACEBOOK_CONSUMER_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback",
            profileFields: ['id', 'first_name', 'last_name', 'gender', 'email'],
            passReqToCallback: true
            // haven't decided the picture
        },
        function (req, accessToken, refreshToken, profile, done) {
            console.log(profile);
            Artists.findOrCreate({
                username: profile._json.id,
                pwd : generator.generate({
                    length: 8,
                    numbers: true
                }),
                givenname: profile.name.givenName,
                lastname: profile.name.familyName,
                gender: profile.gender,
                email: profile.emails[0].value

            }, function (err, user) {
                console.log(user);
                if (err) {
                    return done(err);
                }
                done(null, user);
            });
        }
    ));


    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.pwd);
    };
    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };
};

