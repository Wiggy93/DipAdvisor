const { fetchLocationById } = require("../models/models");

const getLocations = (req, res, next) => {};
const getLocationById = (req, res, next) => {
  const { location_id } = req.params;
  fetchLocationById(location_id)
    .then((location) => {
      res.send({ location });
    })
    .catch(next);
};

module.exports = { getLocations, getLocationById };
