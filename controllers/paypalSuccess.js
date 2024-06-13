const paypal = require("paypal-rest-sdk");
const userModel = require("../models/userModel");
const subscribeModel = require("../models/subscriptionModel");

const paySuccess = async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const express_checkout_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "GBP",
            total: req.query.amount,
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      express_checkout_json,
      async function (error, payment) {
        if (error) {
          console.log(error);
          return res.redirect(`${process.env.fRONTEND_URL}/failed`);
        } else {
          const response = JSON.stringify(payment);
          const ParsedResponse = JSON.parse(response);

          console.log("taking pay", ParsedResponse.transactions[0].description);
          const { paymentType, amount, userId } = JSON.parse(
            ParsedResponse.transactions[0].description
          );
          console.log(paymentType, amount, "pay--->am", { [paymentType]: 1 });
          const updatedUser = await userModel.findByIdAndUpdate(userId, {
            [paymentType]: 1,
          });
          console.log(paymentType, "taking payment", updatedUser);

          const subscription = new subscribeModel({
            userId,
            userName: updatedUser.name,
            payerId: payerId,
            paymentId: paymentId,
            amount: amount,
          });
          subscription.save((error, sub) => {
            console.log(error, "error---->", sub);
          });

          return res.redirect(`${process.env.fRONTEND_URL}/success`);
        }
      }
    );
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = paySuccess;
