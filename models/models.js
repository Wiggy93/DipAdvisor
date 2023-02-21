const locationSchema = require("../schemas/locationSchema");

const fetchLocations = () => {
  return locationSchema.find({}).then((data) => {
    return data;
  });
};

const fetchLocationById = async (location_id) => {
  const location = await locationSchema.findById(location_id);

  return location;
};

module.exports = { fetchLocationById, fetchLocations };
