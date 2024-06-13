const slotModel = require("../models/bookSlot");

async function bookSlot(req, res) {
  let isAvailable = await slotModel.findOne({
    date: req.body.date,
    time: req.body.time,
  });
  if (isAvailable) {
    return res.status(400).json({
      status: true,
      message: "A slot with this date and time already exists",
    });
  }

  try {
    const newSlot = new slotModel({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
    });

    await newSlot
      .save()
      .then((slot) =>
        res.json({
          slot,
          status: true,
          message: "Slot booked successfully",
        })
      )
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = bookSlot;
