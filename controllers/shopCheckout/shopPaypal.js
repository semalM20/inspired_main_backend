const paypal = require("paypal-rest-sdk");

paypal.configure({
  // mode: "sandbox",
  mode: "live",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

const shopPayment = async (req, res) => {
  const amount = req.body.amount;
  const userId = req.body.userId;

  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        // return_url: "http://localhost:5900/api/success?amount=" + amount,
        // cancel_url: "http://localhost:5900/api/failed",
        return_url: "https://inspired-studio-academy.onrender.com/api/shop-success?amount=" + amount,
        cancel_url: "https://inspired-studio-academy.onrender.com/api/shop-failed?amount=" + amount,
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
            amount,
            userId,
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

module.exports = shopPayment;
