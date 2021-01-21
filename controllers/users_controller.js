const user  = require('../config/mongoose');
const User=require('../models/users');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"Users's profile",
            profile_user:user
        });
    });
}
module.exports.posts=function(req,res){
    return res.end('<h1> User s posts');
}

// update profile action
module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer Error',err);
                }
                // console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(fs.existsSync(path.join(__dirname,'..',user.avatar))){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    else{
        req.flash('error','You are unauthorised to change username or password');
        return res.redirect('back');
    }
}

// rednder sign up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial:Sign Up"
    });
}

// render sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial:Sign In"
    });
}

// get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in searching database');
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession=function(req,res){
    req.flash('success','Logged In successfully');
    res.redirect('/');
}

// destroy session action
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have looged out!');
    return res.redirect('/');
}