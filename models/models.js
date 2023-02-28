const locationSchema = require("../schemas/locationSchema");

const fetchLocations = (query) => {
  if (query && Object.keys(query).length > 0) {
    const acceptableQueries = ["public", "dangerous"];
    const validQuery = acceptableQueries.find(
      (element) => element === Object.keys(query)[0]
    );

    if (query && validQuery) {
      return locationSchema.find(query).then((data) => {
        return data;
      });
    }
    if (query && !validQuery) {
      return Promise.reject({ status: 400, message: "Bad request" });
    }
  } else {
    return locationSchema.find().then((data) => {
      return data;
    });
  }
};

const addLocation = async (body, list) => {
  if (
    body.location_name === undefined ||
    body.created_by === undefined ||
    body.description === undefined ||
    body.public === undefined ||
    body.coordinates === undefined
  ) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }
  return await locationSchema
    .insertMany({
      ...body,
      _id: list + 1,
    })
    .then((location) => {
      return location;
    })
    .catch(() => {
      return Promise.reject({
        status: 409,
        message: "Location name already exists",
      });
    });
};

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
  if (location === null)
    return Promise.reject({ status: 404, message: "Not Found" });

  const updatedLocation = await locationSchema.findByIdAndUpdate(
    location_id,
    { dangerous: location.dangerous ? false : true },
    {
      new: true,
    }
  );
  return updatedLocation;
};

module.exports = {
  fetchLocations,
  addLocation,
  fetchLocationById,
  updateLocationById,
};
