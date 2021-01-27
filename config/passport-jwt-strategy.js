const passport=require('passport');

// importing jwt strategy of passport
const JWTStrategy=require('passport-jwt').Strategy;

// a module to extract jwt from header
const ExtractJWT=require('passport-jwt').ExtractJwt;

// importing User model
const User=require('../models/users');

let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial' //specifying key to decrypt (same key as it was used to encrypt)
}

passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports=passport;