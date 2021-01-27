const passport=require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');
// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new googleStrategy({
    clientID: '165378244556-l98i3jlcrttr71og0im3f42lbj4cgvdm.apps.googleusercontent.com',
    clientSecret: 'cu69EHduMOfQX9OlK5piJq1W',
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done){
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });*/


    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
          if(err){
              console.log('Error in google-strategy-passport',err);
              return;
          }
          console.log(profile);
          if(user){
              return done(null,user);
          }
          else{
              User.create({
                  name:profile.displayName,
                  email:profile.emails[0].value,
                  password:crypto.randomBytes(20).toString('hex')
              },function(err,user){
                if(err){
                    console.log('Error in google-strategy-passport',err);
                    return;
                }
                return done(null,user);
              });
          }
      });
  }
));

module.exports=passport;