const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const { globalErrorHandler } = require("./controllers/errorController");

const app = express();

console.log(process.env.NODE_ENV);
//  1. Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.set("query parser", "extended");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// 2. Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Handling unhandled routes

app.all("/*splat", (req, res, next) => {
  // const err = new Error(`Can't find ${req.url} on this server!`);
  // err.statusCode = 404;
  // err.status = "fail";
  // next(err);

  next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
