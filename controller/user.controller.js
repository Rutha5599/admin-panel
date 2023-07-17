const express=require('express');
const user = require('../model/usermodel');
const userjwt = require('jsonwebtoken');


exports.homepage=async(req,res)=>{

    res.render('home')

}


exports.userregiater=async(req,res)=>{

    res.render('user-register')

}

exports.userregisterdata=async(req,res)=>{
    
    try {
        console.log(req.body);
        var username = req.body.username
        var email = req.body.email
        var password = req.body.password

        var finds = await user.findOne({ email });
        if (finds == null) {
            var userdata = await user.create({
                username,
                email,
                password
            });
            req.flash('success', 'Register Successfully')
            res.redirect('/user/login');
        } else {
            req.flash('success', 'Email Alread Exist')
            res.redirect('back');
            console.log("email already exist");
        }
    } catch (err) {
        console.log(err);
    }
}


exports.userlogin=async(req,res)=>{

    res.render('user-login')

}


exports.userlogindata = async(req,res)=>{

    var email = req.body.email
    var password = req.body.password
    var data = await user.findOne({ email });
    if (data == null) {
        console.log("please register or enter valid email");
        req.flash('success', 'Please Register Valid Email');
        res.redirect('back')

    }
    else {
        if (data.password == password) {
            req.flash('success', 'Loging Successfully');

            console.log(data);
            var token = await userjwt.sign({ userid: data._id }, process.env.key);
            res.cookie("userjwt", token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            console.log(token);

            res.redirect('/user');
            console.log("login successfully");
        }
        else {
            req.flash('success', 'Enter Valid Password')
            res.redirect('back');
            console.log("enter valid password");
        }
    }

}


exports.blogspage=async(req,res)=>{

    res.render('user-blogs')

}


exports.aboutpage=async(req,res)=>{

    res.render('user-about')

}