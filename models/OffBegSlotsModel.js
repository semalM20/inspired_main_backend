const mongoose = require("mongoose");

const slotOffBegCourseSchema = new mongoose.Schema(
  {
    id: String,
    date: Date,
    userName: String,
    availableSlots: Number,
    users: Array,
  },
  {
    timestamps: true,
  }
);

const slotBegModel = mongoose.model(
  "slotBeginnerCourse",
  slotOffBegCourseSchema
);

module.exports = slotBegModel;
