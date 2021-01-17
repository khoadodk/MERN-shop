const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: 'Name is required',
      minlength: [6, 'Too short'],
      maxlength: [32, 'Too long']
    },
    description: {
      type: String,
      trim: true,
      required: 'Description is required',
      minlength: [6, 'Too short'],
      maxlength: [640, 'Too long']
    },
    expiry: {
      type: Date,
      required: true
    },
    discount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
