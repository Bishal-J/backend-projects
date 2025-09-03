require("dotenv").config({ path: "./config.env" });
const app = require("./app");

// console.log(process.env);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
