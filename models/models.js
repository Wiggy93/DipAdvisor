const locationSchema = require("../schemas/locationSchema");

const fetchLocationById = async (location_id) => {
  if (isNaN(location_id))
    return Promise.reject({ status: 400, message: "Bad Request" });
  const location = await locationSchema.findById(location_id);
  if (location === null)
    return Promise.reject({ status: 404, message: "Not Found" });
  return location;
};

const updateLocationById = async (location_id) => {
  if (isNaN(location_id))
    return Promise.reject({ status: 400, message: "Bad Request" });

  const location = await fetchLocationById(location_id);
  return await locationSchema
    .findByIdAndUpdate(
      location_id,
      { dangerous: location.dangerous ? false : true },
      {
        new: true,
      }
    )
    .then((updatedLocation) => {
      if (updatedLocation === null)
        return Promise.reject({ status: 404, message: "Not Found" });
      return updatedLocation;
    });
};

module.exports = { fetchLocationById, updateLocationById };
