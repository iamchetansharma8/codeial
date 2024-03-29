const express=require('express');
const router=express.Router();
const passport=require('passport');

const commentssController=require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication,commentssController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentssController.destroy);
module.exports=router;