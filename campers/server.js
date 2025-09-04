const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const app = require("./app");

// Replace <PASSWORD> in the URI with the actual password from .env
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connection successful!");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Listening on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
})();
