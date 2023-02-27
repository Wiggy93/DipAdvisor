const {
  fetchLocationById,
  updateLocationById,
  fetchLocations,
  addLocation,
} = require("../models/models");
const endpoints = require("../endpoints.json");

const getLocations = (req, res, next) => {
  const query = req.query;
  fetchLocations(query)
    .then((locations) => {
      res.status(200).send({ locations });
    })
    .catch((err) => {
      next(err);
    });
};

const postLocation = async (req, res, next) => {
  const { body } = req;
  fetchLocations()
    .then((locations) => {
      return addLocation(body, locations.length);
    })
    .then((data) => {
      res.status(201).send({ location: data });
    })
    .catch((err) => {
      next(err);
    });
};
const getLocationById = (req, res, next) => {
  const { location_id } = req.params;
  fetchLocationById(location_id)
    .then((location) => {
      res.send({ location });
    })
    .catch(next);
};

const patchLocationById = (req, res, next) => {
  const { location_id } = req.params;
  updateLocationById(location_id)
    .then((updatedLocation) => {
      res.send({ updatedLocation });
    })
    .catch(next);
};

const getEndpoints = (req, res, next) => {
  res.send({ endpoints });
};

module.exports = {
  getLocations,
  postLocation,
  getLocationById,
  patchLocationById,
  getEndpoints,
};
