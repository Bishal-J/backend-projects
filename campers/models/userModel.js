const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide a name!"],
  },
  email: {
    type: String,
    require: [true, "Please provide an email!"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
    lowercase: true,
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on SAVE and Create!!
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Encrypting the password making it secure
  this.password = await bcrypt.hash(this.password, 12);

  // If we set a field to undefied then it is not added to the database.
  this.passwordConfirm = undefined;

  next();
});

// Instance Method
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimestamp;
  }

  console.log(this.passwordChangedAt, JWTTimeStamp);
  // False - Password is not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
