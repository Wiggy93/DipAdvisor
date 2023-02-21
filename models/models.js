const locationSchema = require("../schemas/locationSchema");

const fetchLocationById = async (location_id) => {
  const location = await locationSchema.findById(location_id);

  return location;
};

module.exports = { fetchLocationById };
