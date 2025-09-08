const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

// Uncaught Exception Errors

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

const app = require("./app");

// Replace <PASSWORD> in the URI with the actual password from .env
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

let server;

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful!");

    const PORT = process.env.PORT || 8000;
    server = app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
})();

// Unhandled Promise Rejection Errors
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");

  if (server) {
    server.close(() => {
      console.log("Server closed.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
