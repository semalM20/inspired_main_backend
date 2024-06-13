const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    userId: String,
    payerID: String,
    paymentId: String,
    userName: String,
    subscriptionId: String,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

const subscribeModel = mongoose.model("subscribe", subscribeSchema);

module.exports = subscribeModel;
