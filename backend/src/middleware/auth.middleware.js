const jwt = require("jsonwebtoken");

// verify access token
const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Access token expired" });
  }
};

module.exports = { authenticate };
