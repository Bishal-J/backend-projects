const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const { globalErrorHandler } = require("./controllers/errorController");

const app = express();

// Set security HTTP headers (set at the top so that all the headers are added first)
app.use(helmet());

//  1. Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limits Number of api call to the api
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, query parser reading data from body and the query
app.set("query parser", "extended");
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "10kb",
  })
);

// Not working with the latest node and mongodb
// Data sanitization against NoSQL Query Injection
// app.use(mongoSanitize());
// Data sanitization against XSS
// app.use(xss());
// Prevent parameter pollution
// app.use(hpp());

// Serving Static Files
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
