const slotBegModel = require("../models/OffBegSlotsModel");

const getBeginnerCourseSlotsController = async (req, res) => {
  try {
    const slots = await slotBegModel.find();

    res.status(200).json({
      data: slots,
      message: "slots",
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

module.exports = getBeginnerCourseSlotsController;
