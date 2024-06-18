const userModel = require("../models/userModel");

async function userDetailsController(req, res) {
  console.log(req.query, "querrr------->");
  try {
    if (req.query.userId) {
      const user = await userModel.findById(req.query.userId);

      res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "User Details",
      });
    } else {
      res.status(400).json({
        message: "not logged in",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = userDetailsController;
