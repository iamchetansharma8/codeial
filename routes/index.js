const express=require('express');
const router=express.Router();

// importing home_controller

const homeController=require('../controllers/home_controller');

// specifying homeControllers's home action corresponding to '/' route

router.get('/',homeController.home);

// directing to users.js route from here
router.use('/users',require('./users'));

// directing to posts.js router
router.use('/posts',require('./posts'));

// directing to comments.js router
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

router.use('/likes',require('./likes'));
console.log('router loaded');

module.exports=router;