const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adsSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
  },
  { timesstamps: true }
);

const Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
