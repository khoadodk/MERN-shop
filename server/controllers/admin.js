const Order = require('../models/order');

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product')
      .exec();
    res.json(orders);
  } catch (err) {
    res.status(400).send('Fail to get orders');
    console.log(err);
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const updated = await Order.findOneAndUpdate(
      { _id: orderId },
      { orderStatus },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    res.status(400).send('Fail to update order');
    console.log(err);
  }
};
