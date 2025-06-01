const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { id: bookId } = req.params;

  const review = await Review.create({
    book: bookId,
    user: req.user._id,
    rating,
    comment,
  });

  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  if (review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;
  await review.save();

  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  if (review.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await review.remove();
  res.json({ message: "Review deleted" });
};
