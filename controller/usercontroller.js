const express = require('express');
const user = require('../model/usermodel');
const cloudinary = require('../cloud/cloudinary');

//register page

module.exports.register = (req, res) => {

    try {
        res.render('register');
    } catch (error) {
        console.log(err);
    }

}


//register post data

module.exports.registerdata = async(req,res) =>{
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
            res.redirect('/login');
        } else {
            req.flash('success', 'Email Alread Exist')
            res.redirect('back');
            console.log("email already exist");
        }
    } catch (err) {
        console.log(err);
    }
}


// login page

module.exports.login = (req, res) => {

    try {
        res.render('login');
    } catch (error) {
        console.log(err);
    }

}

// logindata post

exports.logindata = async (req, res) => {

    var email = req.body.email
    var password = req.body.password
    var data = await user.findOne({ email });
    if (data == null) {
        console.log("please register or enter valid email");
        req.flash('success', 'Please Register Valid Email')
        res.redirect('back')

    }
    else {
        if (data.password == password) {
            req.flash('success', 'Loging Successfully')
            res.redirect('/dashboard');
            console.log("login successfully");
        }
        else {
            req.flash('success', 'Enter Valid Password')
            res.redirect('back');
            console.log("enter valid password");
        }
    }


}


// forgetpassword page

module.exports.forgotpassword = async(req, res) => {

    try {
        res.render('forgot-password');
    } catch (error) {
        console.log(err);
    }

}

//dashboard page

module.exports.dashboard = async(req, res) => {

    try {
        res.render('dashboard');
    } catch (error) {
        console.log(err);
    }

}

//forms page

module.exports.forms= async(req, res) => {

    try {
        res.render('forms-input');
    } catch (error) {
        console.log(err);
    }

}

//user table page

module.exports.table= async(req, res) => {

    try {
        var data=await user.find({})
        res.render('tables-basic',{data});
    } catch (error) {
        console.log(err);
    }

}

// user table data deletes

module.exports.deletes= async(req,res)=>{

    try {
        console.log(req.params)
        var cd = await user.findByIdAndDelete(req.params.id);
        console.log(data);
    
        if (cd) {
            console.log('data deleted successfully')
            req.flash('success', 'Data Deleted Successfully')
            res.redirect('back');
        } else {
            req.flash('success', 'Data Not Deleted')
            console.log('data not deleted')
        }
    } catch (error) {
        
    }

}


//user update page

module.exports.updatepage = async (req, res) => {


    console.log(req.params);
    var updatedata = await user.findById(req.params.id );
    res.render('user-table-data', { updatedata });

}

//user table data update



module.exports.updates= async(req,res)=>{

    console.log(req.params,req.url)
    console.log(req.body)
    var data=await user.findById(req.params.id);
    if(req.file){

        cloudinary.uploader.destroy(data.img_id,(err,result)=>{
            if(err){
            console.log(err);
        }
        else{
            console.log(result);
        }
    })
    

    console.log(req.file);
        if(req.file){

            var data=await cloudinary.uploader.upload(req.file.path,{folder:'sos'})
            var img=data.secure_url
            var img_id=data.public_id
        }
        req.body.img=img
        req.body.img_id=img_id

    var update = await user.findByIdAndUpdate(req.params.id, req.body);
    if (update) {
        console.log("data updated successfully");
        req.flash('success', 'Data update Successfully')
        res.redirect('/table');
    }
    else {
        req.flash('success', 'Data not update')
        console.log('data not updated')
    }
}
}
