const express = require("express");
const { getAds, createAds } = require("../controllers/adsController");
const router = express.Router();
const { protect } = require("../middleware/jwtmiddleware");
router.route("/").get(protect, getAds);
router.route("/create").post(protect, createAds);
module.exports = router;
