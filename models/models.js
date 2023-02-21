const locationSchema = require("../schemas/locationSchema");

const fetchLocationById = async (location_id) => {
  if (isNaN(location_id))
    return Promise.reject({ status: 400, message: "Bad Request" });
  const location = await locationSchema.findById(location_id);
  if (location === null)
    return Promise.reject({ status: 404, message: "Not Found" });
  return location;
};

module.exports = { fetchLocationById };
