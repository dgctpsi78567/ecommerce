const express=require("express");
const { userCart,getUserCart,emptyCart,saveAddress,applyCouponToUserCart,createOrder,orders } = require("../controller/user");
const { authChek } = require("../middleware/auth");

const route=express.Router();

route.post("/user/cart", authChek, userCart)
route.get("/user/cart", authChek, getUserCart); 
route.delete("/user/cart", authChek, emptyCart); // empty cart
route.post("/user/address", authChek, saveAddress); 
route.post("/user/cart/coupon", authChek, applyCouponToUserCart);
route.post("/user/order", authChek, createOrder);
route.get("/user/orders", authChek, orders);

module.exports=route