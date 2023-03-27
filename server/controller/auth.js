const User = require("../models/user")

exports.CreateorUpdate = async (req, res) => {

    const { name, picture, email } = req.user;
    // Update 
    const user = await User.findOneAndUpdate(
        { email }, { name : email.split("@")[0] , picture }, { new: true }
    );
    if (user) {
        console.log("User Updated", user);
        return res.json(user);
    } else {
        // Create 
        const newUser = await User({ email , name:email.split("@")[0]  , picture }).save();
        console.log("User Created", newUser)
        return res.json(newUser);
    }
}

exports.userCurrent = async (req, res) => {
    User.findOne({email:req.user.email}).exec((err,user)=>{
        if(err) throw Error(err)
        res.json(user)
    })
}