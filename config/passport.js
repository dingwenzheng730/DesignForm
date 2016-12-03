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
        done(null, artist.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(username, done) {
        Artists.findById(username, function(err, artist) {
            done(err, artist);
        });
    });
// Local login
    passport.use('login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            username : 'username',
            password : 'password'
        },
        function(req, user,password, done) {
            // asynchronous
            console.log(password);
            console.log(user);
            process.nextTick(function() {
                Artists.findOne({ 'username' :  user.username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });
        }));

    passport.use('signup', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        }, function (req, err, username,password, done) {

            Artists.findOne({'username':username,'pwd': password},
                function (err, user) {
                    // error case
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!id) {
                        console.log('User Not Found with Artist \'s name with ' + name);
                        return done(null, false);
                    }
                    //  wrong password
                    if (isValidPassword(id, password)) {
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }

                    return done(null, name);
                }
            );
        }
    ));
    passport.use('signup', new LocalStrategy({
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

