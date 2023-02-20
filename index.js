const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
const app = express();
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
