const slotModel = require("../models/bookSlot");

async function allSlots(req, res) {
  try {
    const allSlots = await slotModel.find();

    res.status(200).json({
      message: "All Slots",
      data: allSlots,
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

module.exports = allSlots;
