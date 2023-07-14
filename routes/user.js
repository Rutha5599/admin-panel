const express=require('express');
const routes=express.Router();
const controller=require('../controller/usercontroller');
const upload=require('../cloud/multer');
const user_token =require('../middleware/user.middleware')


routes.get('/register',controller.register);
routes.post('/registerdata',controller.registerdata)
routes.get('/login',controller.login);
routes.post('/logindata',controller.logindata);
routes.get('/forgotpassword',controller.forgotpassword);
routes.get('/dashboard',user_token,controller.dashboard);
routes.get('/table',user_token,controller.table);
routes.get('/delete/:id',user_token,controller.deletes);
routes.get('/update/:id',user_token,controller.updatepage);
routes.post('/update/:id',user_token,upload.single('img'),controller.updates);
routes.get('/forms',user_token,controller.forms);
routes.get('/logout',(req,res)=>{

    res.cookie("jwt",'');
    res.clearCookie();
    res.redirect('/dashboard');
})



module.exports=routes;