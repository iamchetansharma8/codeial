const express=require('express');
const router=express.Router();
const passport=require('passport');

const postsController=require('../controllers/posts_controller');

// putting check whether user is authenticated or not
router.post('/create',passport.checkAuthentication,postsController.create);

router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);

module.exports=router;