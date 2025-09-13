const jwt = require("jsonwebtoken");

/**
 * Middleware to protect routes using JWT authentication.
 */
function auth(req, res, next) {
  try {
    // Get token from cookies
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "No token provided, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request object
    next();
  } catch (err) {
    // Handle invalid or expired token
    return res.status(401).json({ error: "Token is not valid or has expired" });
  }
}

module.exports = auth;
