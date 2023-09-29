const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {createSecretToken} = require("../utils/SecretToken");

module.exports.signUp = async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = await User.create({ 
        firstName,
        lastName, 
        email, 
        password,
        role: role || "user"
     });
      res
        .status(201)
        .json({ message: "User signed up successfully", success: true, user });
    } catch (error) {
      console.error(error);
    }
  };

module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(200).json({ message: "Please provide an email and password" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(200).json({ message: "email does not exist" });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.status(200).json({ message: "password is incorrect" });
      }
      
      // Create a token for the user which expires in 30mins
      const token = createSecretToken(user._id, user.role);
      
      res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 10,
        })
        .status(201)
        .json({ message: "User logged in successfully", success: true, token, user });
    } catch (error) {
      console.error(error);
    }
};

module.exports.logout = async (req, res, next) => {
    try {
      res
        .cookie("token", "", {
          httpOnly: true,
          expires: new Date(0),
        });
      res.status(200).json({ message: "User logged out successfully", success: true });
    } catch (error) {
      console.error(error);
    }
}