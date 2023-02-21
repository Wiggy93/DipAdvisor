const { fetchLocations, addLocation } = require("../models/models");

const getLocations = (req, res) => {
  fetchLocations().then((locations) => {
    res.status(200).send(locations);
  });
};

const postLocation = (req, res, next) => {
  const { body } = req;
  fetchLocations()
    .then((list) => {
      return addLocation(body, list);
    })
    .then((data) => {
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
