const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");
const { addReview } = require("../controllers/reviewController");

// Book routes
router.post("/", protect, addBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/:id/reviews", protect, addReview);

module.exports = router;
