const slugify = require("slugify");
const Category = require("../models/category");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const { name, subIds } = req.body;

    const category = await new Category({
      name,
      slug: slugify(name),
      subs: subIds,
    }).save();
    res.json(category);
  } catch (err) {
    console.log("CAT CREATE FAILED", err);
    res.status(400).send("Fail to create the category.");
  }
};

exports.list = async (req, res) => {
  const category = await Category.find({})
    .sort({ createAt: -1 })
    .populate("subs", "_id name")
    .exec();
  res.json(category);
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category })
    .populate("category")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json({ category, products });
};

exports.update = async (req, res) => {
  const { name, subIds } = req.body;
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), subs: subIds },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (err) {
    console.log("CAT UPDATE FAILED", err);
    res.status(400).send("Fail to update the category.");
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deletedCategory);
  } catch (err) {
    console.log("CAT DELETE FAILED", err);
    res.status(400).send("Fail to delete the category.");
  }
};

exports.getSubs = async (req, res) => {
  try {
    const cat = await Category.findById(req.params._id)
      .populate("subs")
      .select("_id name")
      .exec();
    res.json(cat.subs);
  } catch (err) {
    res.status(400).send("Fail to get the sub category.");
  }
};
