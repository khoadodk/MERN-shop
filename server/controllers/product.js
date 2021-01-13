const slugify = require('slugify');
const Product = require('../models/product');
const User = require('../models/user');

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log('CREATE PRODUCT FAIL', err);
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
  })
    .populate('category')
    .populate('subs')
    .exec();
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
    console.log('PRODUCT UPDATE FAILED', err);
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

// PAGINATION with 3 items per page
exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).send('Fail to list product.');
  }
};

exports.productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

exports.productStar = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    // check if currently logged in user have already rated to this product
    // check if currently logged in user have already added rating to this product?
    let existingRatingObject = product.ratings.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );
    console.log(existingRatingObject);
    // if yes, update the rating
    if (existingRatingObject) {
      const updatedRating = await Product.updateOne(
        {
          ratings: { $elemMatch: existingRatingObject }
        },
        { $set: { 'ratings.$.star': star } },
        { new: true }
      ).exec();
      console.log('updatedRating');
      res.json(updatedRating);
      // if no, added rating the the product
    } else {
      const newRating = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { ratings: { star, postedBy: user._id } }
        },
        { new: true }
      ).exec();
      console.log('newRating');
      res.json(newRating);
    }
  } catch (err) {
    console.log(err);
  }
};
