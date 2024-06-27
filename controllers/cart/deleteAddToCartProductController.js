const cartModel = require("../../models/cart/cartProduct");

const deleteCartProductController = async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is provided in the request
    const productIdToDelete = req.body._id; // Assuming productId is passed as a route parameter

    // Ensure that the product to delete belongs to the current user
    const deleteResult = await cartModel.updateOne(
      { userId: userId },
      { $pull: { products: { _id: productIdToDelete } } }
    );

    if (deleteResult.nModified === 0) {
      throw new Error("Product not found or not deleted");
    }

    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to delete product from cart",
      success: false,
      error: true,
    });
  }
};

module.exports = deleteCartProductController;
