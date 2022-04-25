// const Ads = require("../models/adsModel");
// const asyncHandler = require("express-async-handler");

// // index route
// const getAds = asyncHandler(async (req, res) => {
//   try {
//     const ads = await Ads.find({ user: req.user._id });
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
// const createAds = asyncHandler(async (req, res) => {
//   const { pic, title, desciption } = req.body;
//   if (!pic || !title || !desciption) {
//     //   if pic, tittle, and description not exist, send error
//     res.status(400);
//     throw new Error("Fill all the fields");
//   } else {
//     const ads = new Ads({ user: req.user._id, pic, title, desciption });
//     // create new ads
//     // req.user_id coming from JWT middleware
//     const createdAds = await ads.save();
//     res.status(201).json(createdAds);
//   }
// });

// //show route /sends individual item
// const getIndividualAds = asyncHandler(async (req, res) => {
//   try {
//     const ads = await Ads.findById(req.params.id);
//     if (!ads) {
//       throw new Error("no family by that id here");
//     }
//     // findes the item by it's id and show it
//     res.send({
//       success: true,
//       data: ads,
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

// //delete route
// const deleteAds = asyncHandler(async (req, res) => {
//   const ads = await Ads.findById(req.params.id);
//   if (ads.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Errow("You can't perform this action");
//   }
//   if (ads) {
//     await ads.remove();
//     res.json({ message: "Ads removed" });
//   } else {
//     res.status(404);
//     throw new Error("Ads not found");
//   }
// });

// // upadate/put routes
// const upadateAds = asyncHandler(async (req, res) => {
//   const { pic, title, desciption } = req.body;
//   const ads = await Ads.findById(req.params.id);
//   if (ads.user.toString() !== req.user._id.toString()) {
//     res.status(401);
//     throw new Error("You can't perform this action");
//   }

//   if (ads) {
//     ads.pic = pic;
//     ads.title = title;
//     ads.desciption = desciption;
//     const updatedAds = await ads.save();
//     res.json(updatedAds);
//   }
// });

// module.exports = { getAds, createAds, getIndividualAds, upadateAds, deleteAds };
