const slotBegModel = require("../models/OffBegSlotsModel");

const postBeginnerCourseSlotsController = async (req, res) => {
  try {
    const { date, availableSlots } = req.body;

    const existingSlot = await slotBegModel.findOne({ date: new Date(date) });
    if (existingSlot) {
      res.status(400).json({
        message: "Slot for this date already exists",
        error: true,
        success: false,
      });
    }

    const newSlot = new slotBegModel({
      date: new Date(date),
      availableSlots: availableSlots || 4, // Default to 4 if not provided
    });

    const savedSlot = await newSlot.save();

    res.status(200).json({
      data: savedSlot,
      message: "slots added",
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

module.exports = postBeginnerCourseSlotsController;
