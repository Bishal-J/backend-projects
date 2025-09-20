const Review = require("../models/reviewModel");
const Tour = require("../models/tourModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllReview = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const review = await Review.find(filter);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const tourId = req.body.tour || req.params.tourId;
  const userId = req.user.id;

  console.log(tourId, userId);

  // 1. Check if tour exists
  const tour = await Tour.findById(tourId);

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  const newReview = await Review.create({
    review: req.body?.review,
    rating: req.body?.rating,
    user: userId,
    tour: tourId,
  });

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
