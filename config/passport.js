/**
 * Created by YuAng on 2016-11-22.
 */
/**
 * Created by YuAng on 2016-11-22.
 */
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Artist =  require('./models/artists.js');
var LocalStrategy    = require('passport-local').Strategy;
var configAuth = require('./auth');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
GOOGLE_CONSUMER_KEY ='';
GOOGLE_CONSUMER_SECRET = '';
passport.use('signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // find a user in mongo with provided username
        User.findOne({ 'UserId' :  username }, function(err, user) {

            if (err){
                console.log('SignUp Error: '+err);
                return done(err);
            }
            // already exists
            if (user) {
                console.log('User already exists with username: '+username);
                return done(null, false);
            } else {
                // if there is no user, create the user
                var newArtist = new Artist();
                console.log(req.body);
               // Set credentials
                newArtist.UserId = req.body.artist.id;
                newArtist.Pwd = createHash(req.body.artist.pwd);
                newArtist.givenName = req.body.user.givenName;
                newArtist.familyName = req.body.user.familyName;
                newArtist.Email = req.body.user.Email;

                // save the user
                newArtist.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    console.log(newArtist.id +": "+ newArtist.givenname + "  " + newArtist.familyName+ ' Registration succesful');
                    return done(null, newUser);
                });
            }
        });
    })
);
passport.use(new GoogleStrategy({
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({ userid: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
passport.use(new FacebookStrategy({
        clientID:'1006730306139581',
        clientSecret: 'ef44eadbcb4598df5eccb8cbc2e7c5b5',
        callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function(req,accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            id:profile.email,
             givenName: profile.name.givenName,
            familyName:profile.name.familyName,

        }, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});