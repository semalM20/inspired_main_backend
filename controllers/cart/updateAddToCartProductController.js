const cartModel = require("../../models/cart/cartProduct");

const updateAddToCartProductController = async (req, res) => {
  try {
    const currentUser = req.body.userId; // Assuming userId is extracted from the request
    const { _id, quantity } = req.body;

    if (!_id) {
      throw new Error("Please provide _id of the product to update");
    }

    if (!quantity || quantity < 1) {
      throw new Error("Invalid quantity. Quantity must be greater than zero.");
    }

    // Ensure that the product to update belongs to the current user
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId: currentUser, "products._id": _id },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!updatedCart) {
      throw new Error("Product not found in the cart");
    }

    res.status(200).json({
      message: "Product Quantity Updated Successfully",
      data: updatedCart.products.find((item) => item._id === _id),
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update product quantity in cart",
      success: false,
      error: true,
    });
  }
};

module.exports = updateAddToCartProductController;
