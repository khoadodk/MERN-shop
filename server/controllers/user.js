const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();
    // Remove the old user's cart
    let cartExistByUser = await Cart.findOne({ orderedBy: user._id }).exec();
    if (cartExistByUser) {
      cartExistByUser.remove();
    }
    // Get the productId, count and price
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.title = cart[i].title;
      let { price } = await Product.findById(cart[i]._id)
        .select('price')
        .exec();
      object.price = price;

      products.push(object);
    }
    // Calculate cart total
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    // Save cart to Database and send OK to client
    await new Cart({
      products,
      cartTotal,
      orderedBy: user._id
    }).save();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).send('Fail to SAVE the user cart to DataBase');
    console.log(err);
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id }).exec();
    res.json(cart);
  } catch (err) {
    res.status(400).send('Fail to get the user cart');
    console.log(err);
  }
};

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).send('Fail to remove the cart');
    console.log(err);
  }
};

exports.saveAddress = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).send("Fail to update user's address");
    console.log(err);
  }
};
