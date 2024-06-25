const cartModel = require("../../models/cart/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await cartModel.findOne({ productId });

    console.log(isProductAvailable, "productssss");

    if (isProductAvailable) {
      return res.status(200).json({
        message: "Already exists in add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new cartModel(payload);
    const saveProduct = await newAddToCart.save();

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
