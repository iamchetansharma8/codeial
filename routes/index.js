const express=require('express');
const router=express.Router();

// importing home_controller

const homeController=require('../controllers/home_controller');

// specifying homeControllers's home action corresponding to '/' route

router.get('/',homeController.home);

console.log('router loaded');

module.exports=router;