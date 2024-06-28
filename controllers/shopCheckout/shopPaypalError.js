const shopPayFailed = async (req, res) => {
  return res.redirect(`${process.env.fRONTEND_URL}/shopPaymentFailed`);
};

module.exports = shopPayFailed;
