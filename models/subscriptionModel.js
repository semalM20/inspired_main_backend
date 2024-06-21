const mongoose = require("mongoose");

const subscribeSchema = new mongoose.Schema(
  {
    userId: String,
    payerID: String,
    paymentId: String,
    userName: String,
    userEmail: String,
    subscriptionId: String,
    amount: Number,
    paymentType: String,
    expirySubDate: Date,
  },
  {
    timestamps: true,
  }
);

const subscribeModel = mongoose.model("subscribe", subscribeSchema);

module.exports = subscribeModel;
