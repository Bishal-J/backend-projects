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

// Reset Password Logged In user
router.patch(
  "/update-password",
  authController.protect,
  authController.updatePassword
);

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
