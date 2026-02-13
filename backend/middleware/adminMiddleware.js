const adminMiddleware = (req, res, next) => {
  try {
    // req.user is already set by authMiddleware
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only."
      });
    }

    // If admin, continue
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = adminMiddleware;
