const Book = require("../models/Book");
const Review = require("../models/Review");

// Add new book
exports.addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  const book = await Book.create({
    title,
    author,
    genre,
    description,
    createdBy: req.user._id,
  });
  res.status(201).json(book);
};

// Get all books (pagination + filters)
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 5, author, genre } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, "i");
  if (genre) query.genre = new RegExp(genre, "i");

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(books);
};

// Get book by ID with avg rating and reviews
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviews = await Review.find({ book: book._id }).populate("user", "username");
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
    : "No ratings";

  res.json({ book, avgRating, reviews });
};

// Search books
exports.searchBooks = async (req, res) => {
  const { query } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(query, "i") },
      { author: new RegExp(query, "i") },
    ],
  });
  res.json(books);
};
