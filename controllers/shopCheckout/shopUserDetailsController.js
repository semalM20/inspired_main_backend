const cartModel = require("../../models/cart/cartProduct");
const shopUserDetailsModel = require("../../models/shopCheckout/shopUserDetails");

const shopUserDetailsController = async (req, res) => {
  try {
    const { name, email, phoneNumber, city, postalCode, address, userId } =
      req.body;

    if (!email) {
      throw new Error("Please provide Email");
    }
    if (!phoneNumber) {
      throw new Error("Please provide Phone Number");
    }
    if (!name) {
      throw new Error("Please provide Name");
    }
    if (!city) {
      throw new Error("Please provide city name");
    }
    if (!postalCode) {
      throw new Error("Please provide postal code");
    }
    if (!address) {
      throw new Error("Please provide address");
    }

    const cartProductsInfo = await cartModel.findOne({ userId });

    if (!cartProductsInfo) {
      throw new Error("No products found in the cart");
    }

    const products = cartProductsInfo.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
    }));

    const payload = {
      name,
      email,
      phoneNumber,
      city,
      postalCode,
      address,
      userId,
      products,
    };

    const userData = new shopUserDetailsModel(payload);
    const saveUser = await userData.save();

    res.status(200).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Details Added Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

module.exports = shopUserDetailsController;
