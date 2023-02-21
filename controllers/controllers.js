const { fetchLocationById, fetchLocations } = require("../models/models");

const getLocations = (req, res) => {
  fetchLocations().then((locations) => {
    res.status(200).send(locations);
  });
};
const getLocationById = (req, res) => {
  const { location_id } = req.params;
  fetchLocationById(location_id).then((location) => {
    res.send({ location });
  });
};

module.exports = { getLocations, getLocationById };
