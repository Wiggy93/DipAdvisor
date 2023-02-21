const { addLocation } = require("../models/models");

const getLocations = (req, res) => {};

const postLocation = (req, res, next) => {
  const { body } = req;
  addLocation(body)
    .then((data) => {
      console.log(data, "<<<controller");
      res.status(201).send({ location: data });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getLocations,
  postLocation,
};
