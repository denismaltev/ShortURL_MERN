// Middleware function to check if the user is authorized
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // if server is available
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "You are not authorized." });
    }

    // get userId from token and add it to request. decoded contains userId
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "You are not authorized." });
  }
};
