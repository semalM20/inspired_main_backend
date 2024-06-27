const cartModel = require("../../models/cart/cartProduct");
const productModel = require("../../models/products/productModel");

const addToCartController = async (req, res) => {
  try {
    const { productId, userId } = req?.body;

    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const productName = product.productName;

    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new cartModel({
        userId: userId,
        products: [{ productId, productName, quantity: 1 }],
      });
    } else {
      // Check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // If the product already exists, increase the quantity
        cart.products[productIndex].quantity += 1;
      } else {
        // If the product does not exist, add it to the cart
        cart.products.push({ productId, productName, quantity: 1 });
      }
    }

    const saveProduct = await cart.save();

    res.status(200).json({
      data: saveProduct,
      message: "Product Added in Cart",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

module.exports = addToCartController;
