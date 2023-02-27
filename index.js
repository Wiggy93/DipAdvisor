const routes = require("./routes/routes");
const express = require("express");
const mongoose = require("mongoose");
const { customError, pathError, serverError } = require("./error-handlers");

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
const app = express();
mongoose.connect(mongoString);
const database = mongoose.connection;

app.use(express.json());

app.use("/api", routes);

app.use(pathError);
app.use(customError);
app.use(serverError);

database.on("error", (error) => {
  console.log(error);
});

module.exports = app;
