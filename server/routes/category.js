const express=require("express");
const route=express.Router();

const {userCurrent}=require("../controller/auth");
const { authChek, AdminCheck } = require("../middleware/auth");
const {create,list,read,update,remove,getCategorySubs}=require("../controller/category")

route.post("/category",authChek,AdminCheck, create);
route.get("/categories", list);
route.get("/category/:slug", read);
route.put("/category/:slug",authChek,   AdminCheck,  update);
route.delete("/category/:slug",authChek,AdminCheck, remove);
route.get("/category/subs/:_id",getCategorySubs)

module.exports=route