const express=require("express");
const route=express.Router();

const {CreateorUpdate}=require("../controller/auth");
const {userCurrent}=require("../controller/auth");
const { authChek, AdminCheck } = require("../middleware/auth");

route.post("/create-or-update",authChek, CreateorUpdate);
route.post("/user-current",authChek, userCurrent);
route.post("/admin-current",authChek,AdminCheck, userCurrent);


module.exports=route