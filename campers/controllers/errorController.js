const AppError = require("../utils/appError");

// MongoDB Errors Handling
// 1. Cast Error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// 2. Duplicate Field Error
const handleDuplicateFieldsDB = (err) => {
  const match = err.errmsg?.match(/dup key: {.*?: "(.+?)" }/);
  const value = match ? match[1] : "Unknown";
  const message = `Duplicate field value: ${value}, Please use another value!`;
  return new AppError(message, 400);
};

// 3. Validation Error
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = `Invalid token! Please log in again!`;
  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = `Your token has expired! Please log in again!`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational error: Send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknow error: don't want to leak the detials to the client
    // 1. Log error
    console.error("Error 💥", err);

    // 2. Send a generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendErrorProd(err, res);
  }
};
