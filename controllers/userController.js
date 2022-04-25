const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/token");

// user login authentification function
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // matchPassword function from userModels
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email Or Password");
  }
});

// user registration authentification function
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // define user data
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exist");
    // if user exist in mongodb , throw this  error
  }
  // if user not exist, save this user
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
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }

  // res.json({
  //   name,
  //   email,
  // });
});

module.exports = { registerUser, authUser };
