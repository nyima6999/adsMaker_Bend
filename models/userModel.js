const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, requred: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// ecrypting user password/ pre-before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// matching password entered with password in database
// bcrypting the password
userSchema.methods.matchPassword = async function (passwordEntered) {
  return await bcrypt.compare(passwordEntered, this.password);
  // this.password; the password coming from the database/mongodb
};

mongoose.models = {};
const User = mongoose.model("User", userSchema);

module.exports = User;
