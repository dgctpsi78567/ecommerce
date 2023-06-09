const User = require("../models/user");
const Product = require("../models/products");
const Cart = require("../models/cart");
const Coupon = require("../models/coupan");
const Order = require("../models/order");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    let productFromDb = await Product.findById(cart[i]._id).select("price").exec();
    object.price = productFromDb.price;
    products.push(object);
  }

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart", newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id }).populate("products.product", "_id title price").exec();
  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2); // 99.99
  
  Cart.findOneAndUpdate({ orderdBy: user._id }, { totalAfterDiscount }, { new: true }).exec();
  res.json(totalAfterDiscount);
};


exports.createOrder = async (req, res) => {
  
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await CartCart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

let bulkOption=products.map((item)=>{
  return{
    updateOne:{
      filter:{_id:item.product._id},
      update:{$inc:{quantity:-item.count,  sold:+item.count} }
    }
  }
})

let updated=await Product.bulkWrite(bulkOption,{})
console.log(("Product Quantity",updated));

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};


exports.orders=async (req,res)=>{
  let user=await User.findOne({email:req.user.email}).exec();

let userOrders=await Order.find({orderBy:user._id})
.populate("products.product")
.exec();

res.json(userOrders);

}
