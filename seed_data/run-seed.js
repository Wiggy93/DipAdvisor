const testData = require("./data/test_data");
const seed = require("./seed.js");
const mongoose = require("mongoose");

const runSeed = () => {
  return seed(testData).then(() => {
    mongoose.connection.close();
  });
};

runSeed();
