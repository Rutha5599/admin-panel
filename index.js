const express = require('express');
const path = require('path');
const flash=require('express-flash');
const session=require('express-session');
// const nodemailer = require('nodemailer');
const cookieparser = require('cookie-parser');
const port =8000;
const app=express();
require('dotenv').config()
app.use(cookieparser());
app.use(flash());

app.use(session({
    secret:'mysecret',
    saveUninitialized:false,
    resave:false
}))

require('./config/db')
const bodyparser=require('body-parser');
app.use(express.urlencoded({extended: false}));

//forgotpassword
// var transport = nodemailer.createTransport({

//     service:"gmail",
//     auth:{
//         user:"jayaaradhenterprise.info@gmail.com",
//         pass:"qwbffhhrhsyvxkqb"
//     }
// });

// var otp = Math.round(9*8*8*8*9);

// console.log(otp);

// var info = transport.sendMail({

//     from:"jayaaradhenterprise.info@gmail.com",
//     to:"skullrudha.gamer5599@gmail.com",
//     subject:"Forgotpassword OTP",
//     html:""
// })




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.static(path.join(__dirname,'public')))


app.use('/admin',require('./routes/adminrouter'));
app.use('/user',require('./routes/userrouter'));

app.get('/admin',(req,res)=>{
    res.redirect('/admin/login')
});

app.get('/',(req,res)=>{
    res.redirect('/user')
})

app.use((req,res)=>{
    res.render('err');
})



app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log('server is running', port);
})