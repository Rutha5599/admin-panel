const express=require('express');
const router=express.Router();
const{
    homepage
}=require('../controller/user.controller')

router.get('/',homepage)


module.exports=router