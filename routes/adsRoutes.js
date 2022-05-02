const express = require("express");
const {
  getAds,
  createAds,
  getIndividualAds,
  upadateAds,
  deleteAds,
} = require("../controllers/adsController");
const router = express.Router();
// const { protect } = require("../middleware/jwtmiddleware");
router.route("/").get(getAds);
router.route("/create").post(createAds);
router.route("/:id").get(getIndividualAds);
router.route("/:id").post(upadateAds);
router.route("/:id").delete(deleteAds);
module.exports = router;
