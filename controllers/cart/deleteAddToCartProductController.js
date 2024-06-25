const cartModel = require("../../models/cart/cartProduct");

const deleteAddToCartProductController = async (req, res) => {
  try {
    const currentUser = req.userId;
    const addToCartProductId = req.body._id;

    const deleteProduct = await cartModel.deleteOne({
      _id: addToCartProductId,
    });

    res.status(200).json({
      message: "Product Deleted From Cart",
      data: deleteProduct,
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

module.exports = deleteAddToCartProductController;
