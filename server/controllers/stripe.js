const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    // Find user
    const user = await User.findOne({ email: req.user.email }).exec();
    // Get the cart total from user
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({
      orderedBy: user._id
    }).exec();
    // check if coupon applied and calcalute the amount
    const { couponApplied } = req.body;

    let finalAmount = 0;
    if (couponApplied && totalAfterDiscount) {
      finalAmount = Math.round(totalAfterDiscount * 100);
    } else {
      finalAmount = Math.round(cartTotal * 100);
    }

    // Send amount to Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: 'usd'
    });
    // Send data to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      totalAfterDiscount,
      payable: finalAmount
    });
  } catch (err) {
    console.log(err);
  }
};
