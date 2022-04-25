require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
// const adsRoutes = require("./routes/adsRoutes");

const mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URI);
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () =>
  console.log("mongo connected: ", process.env.MONGO_URI)
);
db.on("disconnected", () => console.log("mongo disconnected"));
app.use(express.json());
app.use("/api/users", userRoutes);
// app.use("/api/ads", adsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`server running on PORT ${port}`));
