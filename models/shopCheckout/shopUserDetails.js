const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product", // Assuming you have a product model
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const shopUserDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [productSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Assuming you have a user model
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    amount: String,
  },
  {
    timestamps: true,
  }
);

const shopUserDetailsModel = mongoose.model(
  "shopUserDetails",
  shopUserDetailsSchema
);

module.exports = shopUserDetailsModel;
