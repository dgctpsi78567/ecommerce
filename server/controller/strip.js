const stripe = require("stripe")(process.env.STRIPE_KEY)
const User = require("../models/user");
const Cart = require("../models/cart");


exports.createPayment = async (req, res) => {

    const { coupanApplied } = req.body;

    console.log("ygygygygyy", req.body);
    const user = await User.findOne({ email: req.user.email }).exec();
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({ orderdBy: user._id }).exec();
    console.log("cartTotal", cartTotal, "discount", totalAfterDiscount);
    let finalAmount = 0;

    if (coupanApplied && totalAfterDiscount) {
        finalAmount = totalAfterDiscount * 100;
    } else {
        finalAmount = cartTotal * 100
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: cartTotal,
        currency: "usd"
    })
    
    console.log("cartTotal",cartTotal,"total",totalAfterDiscount,finalAmount);
return;
    res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payble: finalAmount
    })
}