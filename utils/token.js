const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // take token (user id) from the mongodb in the form of encrypted token
    // JWTs are signed with a key when they are generated and then validated with a key upon
    // receipt so we can verify that they haven't been modified in transit.
    expiresIn: "60d",
  });
};

module.exports = generateToken;
