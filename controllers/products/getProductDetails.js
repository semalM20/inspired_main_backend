const productModel = require("../../models/products/productModel");

const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);

    res.status(200).json({
      data: product,
      message: "OK",
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

module.exports = getProductDetails;
