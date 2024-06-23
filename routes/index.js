const express = require("express");

const router = express.Router();

const userSignUpController = require("../controllers/userSignup");
const userSignInController = require("../controllers/userSignin");
const userDetailsController = require("../controllers/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controllers/userLogout");
const allUsers = require("../controllers/allUsers");
const updateUser = require("../controllers/updateUser");
const bookSlot = require("../controllers/bookSlot");
const allSlots = require("../controllers/allSlots");
const forgotPassword = require("../controllers/forgotPassword");
const resetPassword = require("../controllers/resetPassword");
const payment = require("../controllers/paypal");
const payFailed = require("../controllers/paypalError");
const paySuccess = require("../controllers/paypalSuccess");
const postReviewsController = require("../controllers/postReviews");
const getReviewsController = require("../controllers/getReviews");
const allSubscriptions = require("../controllers/allSubsciptions");
const getBeginnerCourseSlotsController = require("../controllers/getBeginnerCourseSlots");
const postBeginnerCourseSlotsController = require("../controllers/beginnerCourseSlots");

router.post("/signup", userSignUpController);
router.post("/login", userSignInController);
router.get("/user-details", userDetailsController);
router.get("/userLogout", userLogout);

router.post("/book-slot", bookSlot);
router.get("/all-slot", authToken, allSlots);

router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

router.post("/payment", payment);
router.get("/success", paySuccess);
router.get("/failed", payFailed);

router.get("/userDetails/:userId", userDetailsController);

router.post("/post-reviews", postReviewsController);
router.get("/get-reviews", getReviewsController);

router.get("/all-subscription", authToken, allSubscriptions);
router.get("/beginner-course-slots", getBeginnerCourseSlotsController);
router.post(
  "/add-beginner-course-slots",
  authToken,
  postBeginnerCourseSlotsController
);

module.exports = router;
