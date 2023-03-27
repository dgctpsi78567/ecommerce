const express=require("express");
const route=express.Router();

const { authChek, AdminCheck } = require("../middleware/auth");
const {create,list,remove}=require("../controller/coupan")

route.post("/coupan",authChek,AdminCheck, create);
route.get("/coupans", list);
route.delete("/coupan/:coupanId",authChek,AdminCheck, remove);


module.exports=route