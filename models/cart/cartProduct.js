const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema(
  {
    userId: String,
    products: [
      {
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
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.model("cartProduct", cartProductSchema);

module.exports = cartModel;
