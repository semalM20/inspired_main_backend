const shopUserDetailsModel = require("../../models/shopCheckout/shopUserDetails");

async function allShopUserDetails(req, res) {
  try {
    const allBuyers = await shopUserDetailsModel.find();

    res.status(200).json({
      message: "All Products Buyers",
      data: allBuyers,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

module.exports = allShopUserDetails;
