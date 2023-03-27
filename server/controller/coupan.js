const Coupon = require("../models/coupan");

// create, remove, list

exports.create = async (req, res) => {
  try {
    console.log("6666666666",req.body.coupan);
    const { name, expiry, discount } = req.body.coupan;
    res.json(await new Coupon({ name, expiry, discount }).save());
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const coupanId=req.params.coupanId
    console.log(coupanId);
    const coupan=await Coupon.findByIdAndDelete(coupanId).exec()
    res.json(coupan);
    console.log("rrrrr",coupan);
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};
