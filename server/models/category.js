const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: "Name is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    subs: [{ type: ObjectId, ref: "SubCategory" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
