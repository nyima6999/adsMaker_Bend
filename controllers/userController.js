const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

// user authentification function
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // define user data
  const userExists = await User.find({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exist");
    // if user exist in mongoose , throw this error
  }
  // if user not exist, create a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  //  if user successfully created, response with status 201
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }

  res.json({
    name,
    email,
  });
});

// user login authentification function
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email Or Password");
  }
});

module.exports = { registerUser, authUser };
