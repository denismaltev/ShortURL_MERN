const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // mongoose
    await mongoose.connect(process.env.DATABASE_ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server error: ", error.message);
    process.exit(1);
  }
}

app.use(express.json({ extended: true })); // parser for using json req
app.use("/api/auth", require("./routes/auth.routes"));

start();
