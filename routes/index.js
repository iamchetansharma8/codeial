const express=require('express');
const router=express.Router();

// importing home_controller

const homeController=require('../controllers/home_controller');

// specifying homeControllers's home action corresponding to '/' route

router.get('/',homeController.home);

// directing to users.js route from here
router.use('/users',require('./users'));

console.log('router loaded');

module.exports=router;