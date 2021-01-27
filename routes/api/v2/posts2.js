const express=require('express');
const router=express.Router();
const posts2Api=require('../../../controllers/api/v2/posts2_api');
router.get('/',posts2Api.index);

module.exports=router;