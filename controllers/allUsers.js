const userModel = require("../models/userModel");

async function allUsers(req, res) {
  try {
    const allUsers = await userModel.find();

    res.status(200).json({
      message: "All Users",
      data: allUsers,
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

module.exports = allUsers;
