const admin=require("../firebase");
const User = require("../models/user");

exports.authChek =async(req,res,next)=>{
    // console.log(req.headers);  // token
    try{
        const firebaseUser=await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log("Firebase User in Authentication", firebaseUser);
        req.user=firebaseUser;
        next();
    }catch(err){
        res.status(401).json({err:"Invalid token"});
        
    }
}

exports.AdminCheck=async (req,res,next)=>{
    const {email}=req.user;
    const adminUser=await User.findOne({email}).exec();
    if(adminUser.role !=="admin"){
        res.status().json({
            err:"Admin Resources. Access denied"
        })
    }else{
        next();
    }
};