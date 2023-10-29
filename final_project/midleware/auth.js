const jwt=require("jsonwebtoken");

exports.authtoken=(req,res,next)=>{
    const {jwtoken}=req.cookies;
    if(jwtoken){
        jwt.verify(jwtoken,"qwerty",(err,user)=>{
            if(err){
                res.status(403).json("token is invalied")
            }
            req.data=user;
            console.log(req.data);
            next();
        })
    }
    else{
        res.status(500).json({message:"something unofficial in jwt"})
    }
}