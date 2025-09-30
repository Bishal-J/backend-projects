const express = require("express");
// const path = require("path");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const AppError = require("./utils/appError");
const { globalErrorHandler } = require("./controllers/errorController");

const app = express();

// Template Engine and Serving Static Files
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));

// Set security HTTP headers (set at the top so that all the headers are added first)
app.use(helmet());

// Enabling Cors
app.use(cors());

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
app.use(cookieParser());

// Not working with the latest node and mongodb
// Data sanitization against NoSQL Query Injection
// app.use(mongoSanitize());
// Data sanitization against XSS
// app.use(xss());
// Prevent parameter pollution
// app.use(hpp());

// 2. Routes

// API Routes
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/review", reviewRouter);

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
