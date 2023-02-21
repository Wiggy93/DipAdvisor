const { fetchLocationById, updateLocationById } = require("../models/models");

const getLocations = (req, res, next) => {};
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

module.exports = { getLocations, getLocationById, patchLocationById };
