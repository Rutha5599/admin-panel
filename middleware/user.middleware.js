const jwt = require('jsonwebtoken');
const user_token = async(req,res,next)=>{
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
                res.redirect('/deshboard')

        }
        else{
            next()
        }
    }
    else{
        res.redirect('/login')
    }

}




module.exports=user_token;