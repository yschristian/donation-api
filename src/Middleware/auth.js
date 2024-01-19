
const verify = require("../Helpers/jwt");
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.token;
    if (!authHeader) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    const verified = verify.verify(authHeader);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

const verifyTokenAndRole = (roles) => (req, res, next) => {
  verifyToken(req, res, () => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(401).json({ message: "You are not authorized" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndRole };
