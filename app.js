require("dotenv").config();
const { urlencoded } = require("express");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
// const adsController = require("./controllers/adsController");
const adsRoutes = require("./routes/adsRoutes");
const userRoutes = require("./routes/userRoutes");

const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI);
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () =>
  console.log("mongo connected: ", process.env.MONGO_URI)
);
db.on("disconnected", () => console.log("mongo disconnected"));

app.use(morgan("short"));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/ads", adsRoutes);
app.use("/api/users", userRoutes);
// app.use("/ads", adsController);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server running on PORT ${port}`));
