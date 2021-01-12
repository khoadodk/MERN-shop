const slugify = require('slugify');
const SubCategory = require('../models/subcategory');

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subcategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name) + parent
    }).save();
    res.json(subcategory);
  } catch (err) {
    console.log('CREATE SUBCAT ERR', err);
    res.status(400).send('Fail to create the subcategory.');
  }
};

exports.list = async (req, res) => {
  const subcategory = await SubCategory.find({}).sort({ createAt: -1 }).exec();
  res.json(subcategory);
};

exports.read = async (req, res) => {
  const subcategory = await SubCategory.findOne({
    _id: req.params._id
  }).exec();
  res.json(subcategory);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updatedsubCategory = await SubCategory.findOneAndUpdate(
      { _id: req.params._id },
      { name, parent, slug: slugify(name) + parent },
      { new: true }
    );
    res.json(updatedsubCategory);
  } catch (err) {
    console.log('SUB UPDATE FAILED', err);
    res.status(400).send('Fail to update the subcategory.');
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedsubCategory = await SubCategory.findOneAndDelete({
      _id: req.params._id
    });
    res.json(deletedsubCategory);
  } catch (err) {
    console.log('SUB DELETE FAILED', err);
    res.status(400).send('Fail to delete the subcategory.');
  }
};
