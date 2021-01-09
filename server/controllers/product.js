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

exports.list = async (req, res) => {
  const product = await Product.find({}).sort({ createAt: -1 }).exec();
  res.json(product);
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).exec();
  res.json(product);
};
