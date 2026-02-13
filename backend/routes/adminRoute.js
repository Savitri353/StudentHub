const express = require('express');
const router = express.Router();
const {getPendingBooks, approveBook, rejectBook} = require('../controllers/adminController');

const {authMiddleware} = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin: view pending books
router.get(
  "/pending",
  authMiddleware,
  adminMiddleware,
  getPendingBooks
);

// Admin: approve book
router.put(
  "/approve/:id",
  authMiddleware,
  adminMiddleware,
  approveBook
);

// Admin: reject book
router.delete(
  "/reject/:id",
  authMiddleware,
  adminMiddleware,
  rejectBook
);

module.exports = router;