const subscribeModel = require("../models/subscriptionModel");

async function allSubscriptions(req, res) {
  try {
    const allSubscriptions = await subscribeModel.find();

    res.status(200).json({
      message: "All Subscriptions",
      data: allSubscriptions,
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
}

module.exports = allSubscriptions;
