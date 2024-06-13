const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;

    const tokenData = await userModel.findOne({ token: token });

    if (tokenData) {
      const password = req.body.password;
      const newPassword = await securePassword(password);

      const userData = await userModel.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );

      res.status(200).json({
        message: "User password has been changed successfully",
        data: userData,
        success: true,
        error: false,
      });
    } else {
      res.status(500).json({
        message: "This link has been expired",
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
};

module.exports = resetPassword;
