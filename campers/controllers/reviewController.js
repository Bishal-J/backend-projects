const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllReview = catchAsync(async (req, res, next) => {
  const review = await Review.find();

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create({
    review: req.body?.review,
    rating: req.body?.rating,
    user: req.body?.user,
    tour: req.body?.tour,
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
