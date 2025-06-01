const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
