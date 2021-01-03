const express=require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

router.get('/profile',usersController.profile);

// directing to posts.js router for /users/posts

router.get('/posts',usersController.posts);

module.exports=router;