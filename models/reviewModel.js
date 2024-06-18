const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const reviewModel = mongoose.model("reviews", reviewSchema);

module.exports = reviewModel;
