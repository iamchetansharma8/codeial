const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');
// telling passport to use the local strategy
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
// done is an inbuilt function to check the status what happened
function(req,email,password,done){
    // find an user and establish identity
    // 1st email is the email defined in db and 2nd is the one passed in the function above
    User.findOne({email:email}, function(err,user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        if(!user || user.password!=password){
            req.flash('error','Invalid username or password');
            return done(null,false);
        }
        return done(null,user);
    });
}
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

// deserializing the user from the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user');
            return done(err);
        }
        return done(null,user);
    });
});

// check if user is authenticated (middleware used)
passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

// sending current session cookie from req.user to locals for views
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}

// exporting passport
module.exports=passport;