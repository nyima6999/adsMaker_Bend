// const express = require("express");
// const router = express();
// const Ads = require("../models/adsModel");

// // index route
// router.get("/", async (req, res) => {
//   try {
//     const ads = await Ads.find();
//     // finds the items in the schema
//     res.send({
//       success: true,
//       data: ads,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err,
//     });
//   }
// });

// // create request
// router.post("/", async (req, res) => {
//   try {
//     const newAds = await Ads.create(req.body);
//     console.log(req.body);
//     res.send({
//       success: true,
//       data: newAds,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err,
//     });
//   }
// });

// //show route /sends individual item
// router.get("/:id", async (req, res) => {
//   try {
//     const ads = await Ads.findById(req.body.id);
//     if (!ads) {
//       throw new Error("no ads by that id here");
//     }
//     // finds the item by it's id and show it
//     res.send({
//       success: true,
//       data: ads,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err.message,
//     });
//   }
// });

// //delete route
// router.delete("/:id", async (req, res) => {
//   try {
//     const ads = await Ads.findByIdAndDelete(req.params.id);
//     if (!ads) {
//       throw new Error("no ads by that id here");
//     }
//     res.send({
//       success: true,
//       data: ads,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err.message,
//     });
//   }
// });

// // put route
// router.put("/:id", async (req, res) => {
//   try {
//     const ads = await Ads.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!ads) {
//       throw new Error("no ads by that id here");
//     }
//     // finds the item by it's id and and update
//     res.send({
//       success: true,
//       data: ads,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err.message,
//       // shows err if item id does't matches
//     });
//   }
// });

// module.exports = router;

const Ads = require("../models/adsModel");
const asyncHandler = require("express-async-handler");

// index route
const getAds = asyncHandler(async (req, res) => {
  const ads = await Ads.find();
  res.json(ads);
});

// create request
const createAds = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    //   if tittle, and description not exist, send error
    res.status(400);
    throw new Error("Fill all the fields");
  } else {
    const ads = new Ads({ title, description });
    // create new ads
    // req.user_id coming from JWT middleware
    const createdAds = await ads.save();
    res.status(201).json(createdAds);
  }
});

//show route /sends individual item
const getIndividualAds = asyncHandler(async (req, res) => {
  const ads = await Ads.findById(req.params.id);
  if (ads) {
    res.json(ads);
  } else {
    res.status(404).json({ message: "ads not found" });
  }
});

//delete route
const deleteAds = asyncHandler(async (req, res) => {
  const ads = await Ads.findById(req.params.id);

  // if (ads.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Errow("You can't perform this action");
  // }
  if (ads) {
    await ads.remove();
    res.json({ message: "ads removed" });
  } else {
    res.status(404);
    throw new Error("Ads not found");
  }
});

//  upadate/put routes
const upadateAds = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const ads = await Ads.findById(req.params.id);
  // if (ads.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You can't perform this action");
  // }

  if (ads) {
    ads.title = title;
    ads.description = description;
    const updatedAds = await ads.save();
    res.json(updatedAds);
  } else {
    res.status(404);
    throw new Error("ads not found");
  }
});

module.exports = { getAds, createAds, getIndividualAds, upadateAds, deleteAds };
