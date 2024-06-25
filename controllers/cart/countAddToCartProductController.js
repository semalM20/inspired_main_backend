const cartModel = require("../../models/cart/cartProduct");

const countAddToCartProductController = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await cartModel.countDocuments({
      userId: userId,
    });

    res.status(200).json({
      data: {
        count: count,
      },
      message: "Ok",
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
};

module.exports = countAddToCartProductController;
