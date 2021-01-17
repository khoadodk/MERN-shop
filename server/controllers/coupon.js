const Coupon = require('../models/coupon');

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount, description } = req.body.coupon;
    const coupon = await new Coupon({
      name,
      expiry,
      discount,
      description
    }).save();
    res.json(coupon);
  } catch (err) {
    console.log(err);
    res.status(400).send('Fail to create coupon.');
  }
};

exports.list = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 }).exec();
    res.json(coupons);
  } catch (err) {
    console.log(err);
    res.status(400).send('Fail to list coupons.');
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params._id).exec();
    res.json(deletedCoupon);
  } catch (err) {
    console.log(err);
    res.status(400).send('Fail to delete coupon.');
  }
};
