const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const router = require("./routes");

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

const PORT = 5900 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
