const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User")
const auth = async (req, res, next) => {
  // Get token from the header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ msg: "token is not valid" });
  }
};

module.exports = auth;
