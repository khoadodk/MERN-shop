const slugify = require('slugify');
const SubCategory = require('../models/subcategory');

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subcategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name)
    }).save();
    res.json(subcategory);
  } catch (err) {
    res.status(400).send('Fail to create the subcategory.');
  }
};

exports.list = async (req, res) => {
  const subcategory = await SubCategory.find({}).sort({ createAt: -1 }).exec();
  res.json(subcategory);
};

exports.read = async (req, res) => {
  const subcategory = await SubCategory.findOne({
    slug: req.params.slug
  }).exec();
  res.json(subcategory);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedsubCategory = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedsubCategory);
  } catch (err) {
    res.status(400).send('Fail to update the subcategory.');
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedsubCategory = await SubCategory.findOneAndDelete({
      slug: req.params.slug
    });
    res.json(deletedsubCategory);
  } catch (err) {
    res.status(400).send('Fail to delete the subcategory.');
  }
};
