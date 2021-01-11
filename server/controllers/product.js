const slugify = require('slugify');
const Product = require('../models/product');

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    res.status(400).send('Fail to create product.');
  }
};

exports.listAll = async (req, res) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();
  res.json(products);
};

exports.read = async (req, res) => {
  const product = await Product.findOne({
    _id: req.params._id
  }).exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send('Fail to update the product.');
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedPropduct = await Product.findByIdAndDelete(
      req.params._id
    ).exec();
    res.json(deletedPropduct);
  } catch (err) {
    res.status(400).send('Fail to delete product.');
  }
};
