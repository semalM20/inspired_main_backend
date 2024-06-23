const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  // mode: "live",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const payment = async (req, res) => {
  const paymentType = req.body.paymentType;
  const amount = req.body.amount;
  const userId = req.body.userId;

  const _slotId = req.body.slotId;
  console.log("slot id", _slotId);

  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5900/api/success?amount=" + amount,
        cancel_url: "http://localhost:5900/api/failed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: amount,
                currency: "GBP",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "GBP",
            total: amount,
          },
          description: JSON.stringify({
            paymentType,
            amount,
            userId,
            _slotId,
          }),
        },
      ],
    };

    await paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log("errrrrr", error);
        throw error;
      } else {
        console.log(payment);

        let data = payment;
        res.status(200).json({
          message: "payment initiated",
          data: data,
          success: true,
          error: false,
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = payment;
