const Book = require('../models/Book');

//1 Create a new book
exports.addBook = async (req, res) => {
    try {
        const {
            title,
            author,
            price,
            semester,
            department,
            description,
            
    } = req.body;
    const image = req.file ? req.file.path : null; // from upload middleware
     // 1. Validate required fields
    if (!title || !author || !price || !semester || !department || !image) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

     // 2. Create new book
    const book = await Book.create({
      title,
      author,
      price,
      semester,
      department,
      description,
      image,
      owner: req.user.userId // from auth middleware
    });

       // 3. Send response
    res.status(201).json({
      message: "Book added successfully. Waiting for admin approval.",
      book
    });
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//2 Get all approved books
exports.getApprovedBooks = async (req, res) => {
  try {

    const { title, semester, department } = req.query;

    let filter = { isApproved: true };

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (semester) {
      filter.semester = semester;
    }

    if (department) {
      filter.department = department;
    }

    const books = await Book.find(filter)
      .populate("owner", "name phone");

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//3 Profile page – logged-in user's books
exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//4 Edit a book
exports.editBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId; // from authMiddleware

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found."
      });
    }

    // 🔐 OWNER CHECK
    if (book.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to edit this book."
      });
    }

    // ✏️ Update fields
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.price = req.body.price || book.price;
    book.semester = req.body.semester || book.semester;
    book.department = req.body.department || book.department;
    book.description = req.body.description || book.description;
    book.image = req.body.image || book.image;

    // 🔁 Re-approval required after edit
    book.isApproved = false;

    await book.save();

    res.json({
      message: "Book updated successfully and sent for re-approval.",
      book
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while updating the book."
    });
  }
};

//5 Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.userId;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found."
      });
    }

    // 🔐 OWNER CHECK
    if (book.owner.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this book."
      });
    }

    await book.deleteOne();

    res.json({
      message: "Book deleted successfully."
    });

  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while deleting the book."
    });
  }
};

//6 Get single book by ID (for EditBookForm)
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;     
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found."
      });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getBookDetails = async (req, res) => {
   try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId)
    .populate("owner", "name phone"); // 👈 seller details

    if (!book) {
      return res.status(404).json({message: "Book not found." });
    }
     // If user is NOT logged in, remove phone number
    if (!req.user) {
      book.owner.phone = undefined;
    }
    res.status(200).json({ book });
   } catch (error) {
    res.status(500).json({ message: "Server error" });
   }
};