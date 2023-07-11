const express=require('express');
const routes=express.Router();
const controller=require('../controller/usercontroller');
const upload=require('../cloud/multer');


routes.get('/register',controller.register);
routes.post('/registerdata',controller.registerdata)
routes.get('/login',controller.login);
routes.post('/logindata',controller.logindata);
routes.get('/forgotpassword',controller.forgotpassword);
routes.get('/dashboard',controller.dashboard);
routes.get('/table',controller.table);
routes.get('/delete/:id',controller.deletes);
routes.get('/update/:id',controller.updatepage);
routes.post('/update/:id',upload.single('img'),controller.updates);
routes.get('/forms',controller.forms);



module.exports=routes;