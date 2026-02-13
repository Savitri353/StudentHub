const jwt = require("jsonwebtoken");


exports.authMiddleware = (req, res, next) => {
  try {
    // ✅ 1. Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Please log in to continue." });
    }

    // ✅ 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ 3. Attach user data to request
    req.user = decoded;

    // ✅ 4. Continue
    next();

  } catch (error) {
    return res.status(401).json({ message: "Your session has expired. Please log in again. "});
  }
};
