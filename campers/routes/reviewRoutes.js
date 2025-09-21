const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const router = express.Router({
  mergeParams: true,
});

// POST /tour/343432/reviews
// GET /tour/3423423/reviews
// POST /reviews
// Get /reviews

// Routes below this need authentication
router.use(authController.protect);

router
  .route("/")
  .get(reviewController.getAllReview)
  .post(authController.restrictTo("user"), reviewController.createReview);

router
  .route("/:id")
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  );

module.exports = router;
