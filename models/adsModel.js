const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adsSchema = new Schema(
  {
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
  },
  { timesstamps: true }
);

const Ads = mongoose.model("Family", adsSchema);

module.exports = Ads;
