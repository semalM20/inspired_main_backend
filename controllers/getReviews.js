const reviewModel = require("../models/reviewModel");

const getReviewsController = async (req, res) => {
  try {
    const reviews = await reviewModel.find();

    res.status(200).json({
      data: reviews,
      message: "reviews",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getReviewsController;
