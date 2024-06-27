const cartModel = require("../../models/cart/cartProduct");

const addToCartViewProductController = async (req, res) => {
  try {
    const currentUser = req.userId;
    console.log(currentUser);

    const allProducts = await cartModel
      .find({ userId: currentUser })
      .populate("products.productId");

    res.status(200).json({
      data: allProducts,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProductController;
