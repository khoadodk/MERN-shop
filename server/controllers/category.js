const slugify = require('slugify');
const Category = require('../models/category');
const SubCategory = require('../models/subcategory');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send('Fail to create the category.');
  }
};

exports.list = async (req, res) => {
  const category = await Category.find({}).sort({ createAt: -1 }).exec();
  res.json(category);
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).send('Fail to update the category.');
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug
    });
    res.json(deletedCategory);
  } catch (err) {
    res.status(400).send('Fail to delete the category.');
  }
};

exports.getSubs = async (req, res) => {
  try {
    const subs = await SubCategory.find({ parent: req.params._id });
    res.json(subs);
  } catch (err) {
    res.status(400).send('Fail to get the sub category.');
  }
};
