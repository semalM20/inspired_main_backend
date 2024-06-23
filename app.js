const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const router = require("./routes");

const cron = require("node-cron");
const subscribeModel = require("./models/subscriptionModel");
const userModel = require("./models/userModel");

const app = express();
app.use(
  cors({
    origin: process.env.fRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const checkAndExpireSubscriptions = async () => {
  const now = Date.now();

  try {
    const expiredSubscriptions = await subscribeModel.find({
      expirySubDate: { $lt: now },
      paymentType: "onlineCoursePayment",
    });
    console.log("expiredSubscriptions", expiredSubscriptions);

    for (const sub of expiredSubscriptions) {
      await userModel.findByIdAndUpdate(sub.userId, {
        onlineCoursePayment: 0,
      });
    }

    console.log("Expired subscriptions updated.");
  } catch (error) {
    console.error("Error updating subscriptions:", error);
  }
};

// Schedule the task to run at midnight every day
cron.schedule("0 0 * * *", () => {
  console.log("Running subscription expiry check...");
  checkAndExpireSubscriptions();
});

// restart sever after every 5 minutes
cron.schedule("*/5 * * * *", () => {
  console.log("server restart after every 5 minutes...");
});

// Manual trigger endpoint
app.get("/manual-trigger", async (req, res) => {
  try {
    await checkAndExpireSubscriptions();
    res.status(200).send("Manual trigger executed successfully.");
  } catch (error) {
    res.status(500).send("Error executing manual trigger.");
  }
});

const PORT = 5900 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
