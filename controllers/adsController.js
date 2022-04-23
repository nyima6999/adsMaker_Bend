const Ads = require("../models/adsModel");
const asyncHandler = require("express-async-handler");

// index route
const getAds = asyncHandler(async (req, res) => {
  try {
    const ads = await Ads.find({ user: req.user._id });
    res.send({
      success: true,
      data: ads,
    });
  } catch (err) {
    res.send({
      success: false,
      data: err,
    });
  }
});

// create request
const createAds = asyncHandler(async (req, res) => {
  const { pic, title, desciption } = req.body;
  if (!pic || !title || !desciption) {
    //   if pic, tittle, and description not exist, send error
    res.status(400);
    throw new Error("Fill all the fields");
  } else {
    const ads = new Ads({ user: req.user._id, pic, title, desciption });
    // create new ads
    // req.user_id coming from JWT middleware
    const createdAds = await ads.save();
    res.status(201).json(createdAds);
  }
});

// //show route /sends individual item
// router.get("/:id", async (req, res) => {
//   try {
//     const family = await Family.findById(req.body.id);
//     if (!family) {
//       throw new Error("no family by that id here");
//     }
//     // findes the item by it's id and show it
//     res.send({
//       success: true,
//       data: family,
//       // shows the item if its id matches the input data id
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err.message,
//       // shows err if item id does't matches
//     });
//   }
// });

// // new route handled by react
// // edit route handled by react/showing the page

// //delete route
// router.delete("/:id", async (req, res) => {
//   try {
//     const family = await Family.findByIdAndDelete(req.params.id);
//     if (!family) {
//       throw new Error("no family by that id here");
//     }
//     // findes the item by it's id and delete it
//     res.send({
//       success: true,
//       data: family,
//       // delete the item if its id matches the input data id
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err.message,
//       // shows err if item id does't matches
//     });
//   }
// });

// // put route
// router.put("/:id", async (req, res) => {
//   try {
//     const family = await Family.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!family) {
//       throw new Error("no family by that id here");
//     }
//     // finds the item by it's id and and update
//     res.send({
//       success: true,
//       data: family,
//     });
//   } catch (err) {
//     res.send({
//       success: false,
//       data: err.message,
//       // shows err if item id does't matches
//     });
//   }
// });

module.exports = { getAds, createAds };
