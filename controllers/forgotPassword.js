const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const userModel = require("../models/userModel");

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_PASS,
      },
    });

    const mailOptions = {
      from: process.env.CLIENT_EMAIL,
      to: email,
      subject: "For Reset Password",
      html: `<p>Hi ${name},</p>
      <p>Please click on the link to <a href="${process.env.fRONTEND_URL}/resetPassword/${token}">reset your password</a></p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).json({
          message: error.message || error,
          success: false,
          error: true,
        });
      } else {
        res.status(200).json({
          message: "Mail has been sent:- ",
          res: info.response,
          success: true,
          error: false,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await userModel.findOne({ email: email });

    if (userData) {
      const randomString = randomstring.generate();
      const data = await userModel.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(userData.name, userData.email, randomString);
      res.status(200).json({
        message: "Please check your inbox of mail and reset your password",
        data,
        success: true,
        error: false,
      });
    } else {
      res.status(500).json({
        message: "This email does not exist",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message || error, success: false, error: true });
  }
};

module.exports = forgotPassword;
