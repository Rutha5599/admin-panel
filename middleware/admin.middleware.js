const jwt = require('jsonwebtoken');
const admin = require('../model/adminmodel')
const admin_token = async(req,res,next)=>{
    var toten = req.cookies.jwt
    if(toten){
        console.log("token success");
        var userdata = await jwt.verify(toten,process.env.key,(err,data)=>{
            if(err){
                console.log(err);
            }
            return data

        })
        if(userdata == undefined){
                res.redirect('/admin/login')

        }
        else{
            var data = await admin.findById(userdata.userid)
            if(data == null){
                res.redirect('/admin/login');
                console.log(data,userdata);
            }
            else{
                next();
            }
        }
    }
    else{
        res.redirect('/login')
    }

}




module.exports=admin_token;