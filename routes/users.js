const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

// importing passport
const passport=require('passport');
const { pass } = require('../config/mongoose');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

// update profile
router.post('/update/:id',passport.checkAuthentication,usersController.update);

// directing to posts.js router for /users/posts

router.get('/posts',usersController.posts);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
    }
),usersController.createSession);

// sign out
router.get('/sign-out',usersController.destroySession);

module.exports=router;