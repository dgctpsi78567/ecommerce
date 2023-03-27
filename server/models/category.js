const mongoose = require("mongoose");

const categorySchema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:"Name is Required",
        minlength:[2,"To short"],
        maxlength:[30,"To long"]
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        index:true
    }
},{timestamps:true});

module.exports=mongoose.model("Category",categorySchema);