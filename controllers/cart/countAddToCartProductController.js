const cartModel = require("../../models/cart/cartProduct");

const countAddToCartProductController = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    // const userCart = await cartModel.countDocuments({
    //   userId: userId,
    // });
    const userCart = await cartModel.findOne({
      userId: userId,
    });
    const count = userCart ? userCart.products.length : 0;
    console.log("object", count);

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
