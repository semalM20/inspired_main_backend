const productModel = require("../../models/products/productModel");

const getProductsController = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "all products",
      success: true,
      error: false,
      data: allProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getProductsController;
