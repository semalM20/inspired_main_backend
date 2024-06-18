const reviewModel = require("../models/reviewModel");

const postReviewsController = async (req, res) => {
  try {
    const reviews = new reviewModel(req.body);
    await reviews.save();

    res.status(200).json({
      data: reviews,
      message: "reviews added",
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

module.exports = postReviewsController;
