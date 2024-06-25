const cartModel = require("../../models/cart/cartProduct");

const updateAddToCartProductController = async (req, res) => {
  try {
    const currentUser = req.userId;
    const addToCartProductId = req.body._id;

    const qty = req.body.quantity;

    const updateProduct = await cartModel.updateOne(
      { _id: addToCartProductId },
      {
        ...(qty && { quantity: qty }),
      }
    );

    res.status(200).json({
      message: "Product Updated",
      data: updateProduct,
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

module.exports = updateAddToCartProductController;
