const express=require('express');
const router=express.Router();
const user_token = require('../middleware/user.middleware');


const{
    homepage,
    blogspage,
    aboutpage,
    userregiater,
    userlogin,
    userregisterdata,
    userlogindata
}=require('../controller/user.controller')


router.get('/register',userregiater);
router.post('/user.registardata',userregisterdata);
router.get('/login',userlogin);
router.post('/user.logindata',userlogindata)
router.get('/',homepage);
router.get('/blogs',user_token,blogspage);
router.get('/about',user_token,aboutpage);
router.get('/logout',(req,res)=>{

    res.cookie("userjwt",'');
    res.clearCookie();
    res.redirect('/user');
})


module.exports=router