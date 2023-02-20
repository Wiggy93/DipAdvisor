const mongoose = require("mongoose");
const Model = require("../schemas/locationSchema");
const locations = require("./data/test_data");

require("dotenv").config({
  path: "./.env",
});

const mongoStr = process.env.DATABASE_URL;

mongoose
  .connect(mongoStr)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  try {
    await Model.deleteMany({});
    await Model.insertMany(locations);
  } catch (error) {
    console.log(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("disconnected from database");
});
