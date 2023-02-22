const {
  fetchLocationById,
  updateLocationById,
  fetchLocations,
  addLocation,
} = require("../models/models");

// const { fetchLocations, addLocation } = require("../models/models");

const getLocations = (req, res, next) => {
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

  fetchLocations().then((locations) => {
    res.status(200).send(locations);
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

module.exports = {
  getLocations,
  postLocation,
  getLocationById,
  patchLocationById,
};
