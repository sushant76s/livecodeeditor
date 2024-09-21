const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = {
  authenticateJWT,
};
