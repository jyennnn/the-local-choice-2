require("dotenv").config();
const jwt = require("jsonwebtoken");
const {createSecretToken} = require("../utils/SecretToken");

module.exports.createSecretToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.TOKEN_KEY, {
    expiresIn: "60m",
  });
};
