const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (decoded.id) {
        next();
      } else {
        res.status(401).json({
          error: true,
          bearerToken: "Token invalido!",
        });
      }
    } catch (error) {
      res.status(401).json({
        error: true,
        bearerToken: "Token não autorizado!",
      });
    }
  } else {
    res.status(401).json({
      error: true,
      bearerToken: "Token não pode ser nulo!",
    });
  }
};

module.exports = protect;
