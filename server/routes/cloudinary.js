const express=require("express");
const route=express.Router();

const { authChek, AdminCheck } = require("../middleware/auth");
const {upload,remove}=require("../controller/cloudinary")

route.post("/uploadimage",authChek,AdminCheck, upload);
route.post("/removeimage",authChek,AdminCheck, remove);


module.exports=route