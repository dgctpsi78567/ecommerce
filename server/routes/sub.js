const express=require("express");
const route=express.Router();

const { authChek, AdminCheck } = require("../middleware/auth");
const {create,list,read,update,remove}=require("../controller/sub")

route.post("/sub",authChek,AdminCheck, create);
route.get("/subs", list);
route.get("/sub/:slug", read);
route.put("/sub/:slug",authChek,   AdminCheck,  update);
route.delete("/sub/:slug",authChek,AdminCheck, remove);

module.exports=route