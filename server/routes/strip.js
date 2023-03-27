const express=require("express");
const route=express.Router();

const { authChek } = require("../middleware/auth");
const {createPayment}=require("../controller/strip")

route.post("/create-payment-intent",authChek, createPayment);

module.exports=route