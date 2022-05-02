const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  // user pass throught protect before reaching API(get request)
  let token;
  if (
    req.headers.authorization &&
    // user sending authoriztion header
    req.headers.authorization.startsWith("Bearer")
    // if authorization has token "Bearer" from front end
  ) {
    try {
      token = req.headers.authorization.split("")[1];
      // verifing the token by spliting it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // decodes token id
      // jwt secret created in .env to verify the user
      req.user = await User.findById(decoded.id).select("-password");
      next();
      // send to get API by the next function
    } catch (error) {
      // if token not verified
      res.status(401);
      throw new Error("Not athorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports = { protect };
