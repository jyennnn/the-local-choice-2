const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.TOKEN_KEY;

function isUserAuthenticated(role){
  return async function(req, res, next){
    const token = req.header("Authorization") && req.header("Authorization").split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        // Fetch the user from the database
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("User:", user);
        req.user = user;
      
        // if valid role, then continue
        if (role.includes(user.role)) {
            next();
        }
        else {
            return res.status(401).json({ message: "Unauthorized: Not Admin" });
        }

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
}
module.exports = isUserAuthenticated;
