
const User = require('../models/User');
const Book = require('../models/Book');

//1. Admin: get summary of books
exports.getAdminSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBooks = await Book.countDocuments();
    const pendingCount = await Book.countDocuments({ isApproved: false });

    res.status(200).json({
      totalUsers,
      totalBooks,
      pendingCount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
//admin: get all approved books
exports.getApprovedBooks = async (req, res) => {
  try {
    const books = await Book.find({ isApproved: true })
      .populate("owner", "name email phone");
    res.status(200).json(books);
  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }   
};

//admin: get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate("owner", "name email phone");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//1 Admin: get all pending books
exports.getPendingBooks = async (req, res) => {
  try {
    const books = await Book.find({ isApproved: false })
      .populate("owner", "name email phone");

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//2 Admin: approve book
exports.approveBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.isApproved = true;
    await book.save();

    res.status(200).json({
      message: "Book approved successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//3 Admin: reject book
exports.rejectBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();

    res.status(200).json({
      message: "Book rejected and deleted"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
