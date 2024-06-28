const paypal = require("paypal-rest-sdk");
const shopUserDetailsModel = require("../../models/shopCheckout/shopUserDetails");
const cartModel = require("../../models/cart/cartProduct");

const shopPaySuccess = async (req, res) => {
  try {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    console.log("amount--->", req.query.amount);

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
          return res.redirect(`${process.env.fRONTEND_URL}/shopPaymentFailed`);
        } else {
          const response = JSON.stringify(payment);
          const ParsedResponse = JSON.parse(response);

          console.log("taking pay", ParsedResponse.transactions[0].description);
          const { amount, userId } = JSON.parse(
            ParsedResponse.transactions[0].description
          );

          const updatedUser = await shopUserDetailsModel.findOneAndUpdate(
            { userId },
            { paymentStatus: "paid", amount },
            { new: true, sort: { createdAt: -1 } } // Return the updated document
          );
          console.log("updatedUser--->", updatedUser);

          // Clear the cart for the user
          await cartModel.findOneAndUpdate(
            { userId },
            { $set: { products: [] } }
          );

          return res.redirect(`${process.env.fRONTEND_URL}/shopPaymentSuccess`);
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

module.exports = shopPaySuccess;
