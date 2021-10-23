const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  content: [],
});

const Review = mongoose.model("Review", reviewSchema);

exports.Review = Review;
