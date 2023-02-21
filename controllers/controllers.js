const { fetchLocationById } = require("../models/models");

const getLocations = (req, res) => {};
const getLocationById = (req, res) => {
  const { location_id } = req.params;
  fetchLocationById(location_id).then((location) => {
    res.send({ location });
  });
};

module.exports = { getLocations, getLocationById };
