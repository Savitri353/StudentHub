const express = require('express');
const router = express.Router();
const {getApprovedBooks, getAllBooks,getAdminSummary,getPendingBooks, approveBook, rejectBook} = require('../controllers/adminController');

const {authMiddleware} = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin: view summary
router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  getAdminSummary
);

//Admin: view all books
router.get(
  "/all", 
  authMiddleware,
  adminMiddleware,
 getAllBooks
);

router.get( 
  "/approved",
  authMiddleware,
  adminMiddleware,
  getApprovedBooks
);
// Admin: view pending books
router.get(
  "/pending",
  authMiddleware,
  adminMiddleware,
  getPendingBooks
);

//admin: view approved books
router.get(
  "/approved",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const books = await Book.find({ isApproved: true })
        .populate("owner", "name email phone");

      res.status(200).json(books);
    }

    catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
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