const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Signup
router.post("/signup", authController.signUp);

// Signin
router.post("/signin", authController.signIn);

// Forgot Password
router.post("/forgot-password", authController.forgotPassword);

// Reset Password
router.patch("/reset-password/:token", authController.resetPassword);

// Add Protected route below this
router.use(authController.protect);

// Reset Password Logged In user
router.patch("/update-password", authController.updatePassword);
// Update User Details
router.patch("/update-me", userController.updateMe);
// Delete User
router.delete("/delete-me", userController.deleteMe);
// Get User
router.get("/me", userController.getMe);

// Routes accessible only to admin below this
router.use(authController.restrictTo("admin"));

// USER Routes CRUD
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
