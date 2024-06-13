const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const slotModel = mongoose.model("slot", slotSchema);

module.exports = slotModel;
