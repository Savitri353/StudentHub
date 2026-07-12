const express = require('express');
const router = express.Router();
const { addBook,getApprovedBooks, getMyBooks, editBook, deleteBook,getBookById, getBookDetails} = require('../controllers/bookController');
const {authMiddleware}  = require('../middleware/authMiddleware');
const {optionalAuth} = require('../middleware/optionalAuth');
const upload = require("../middleware/upload");

// 1.Route to add a new book (protected)
router.post('/add', authMiddleware, upload.single("image"),addBook);
//2. Get all approved books
router.get(
  "/approved",
  getApprovedBooks
);

//3. profile user books
router.get("/my-books", authMiddleware, getMyBooks);

//6. Edit a book
router.put("/edit/:id", authMiddleware, upload.single("image"), editBook);
//5.delete a book
router.delete("/delete/:id", authMiddleware, deleteBook);
//6. Get a single book by ID
router.get("/:id", authMiddleware, getBookById);
//7. Get book details (public)
router.get("/details/:id",optionalAuth, getBookDetails);
module.exports = router;