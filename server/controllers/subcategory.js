const slugify = require("slugify");
const SubCategory = require("../models/subcategory");
const Product = require("../models/product");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const subcategory = await new SubCategory({
      name,

      slug: slugify(name),
    }).save();
    res.json(subcategory);
  } catch (err) {
    console.log("CREATE SUBCAT ERR", err);
    res.status(400).send("Fail to create the subcategory.");
  }
};

exports.list = async (req, res) => {
  const subcategory = await SubCategory.find({}).sort({ createAt: -1 }).exec();
  res.json(subcategory);
};

exports.read = async (req, res) => {
  const subcategory = await SubCategory.findById(req.params._id).exec();
  const products = await Product.find({ subs: subcategory })
    .populate("category")
    .exec();
  res.json({ subcategory, products });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updatedsubCategory = await SubCategory.findOneAndUpdate(
      { _id: req.params._id },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updatedsubCategory);
  } catch (err) {
    console.log("SUB UPDATE FAILED", err);
    res.status(400).send("Fail to update the subcategory.");
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedsubCategory = await SubCategory.findOneAndDelete({
      _id: req.params._id,
    });
    res.json(deletedsubCategory);
  } catch (err) {
    console.log("SUB DELETE FAILED", err);
    res.status(400).send("Fail to delete the subcategory.");
  }
};
