const express = require('express');
const path = require('path');
// const flash=require('express-flash');
const session=require('express-session');
const port =8000;
const app=express();


// app.use(flash());

app.use(session({
    secret:'mysecret',
    saveUninitialized:false,
    resave:false
}))

require('./config/db')
const bodyparser=require('body-parser');
app.use(express.urlencoded({extended: false}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'assets')))


app.use('/',require('./routes/user'));

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