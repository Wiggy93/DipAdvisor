const locationSchema = require("../schemas/locationSchema");

const fetchLocations = (query) => {
  const acceptableQueries = [
    "location_name",
    "created_by",
    "public",
    "dangerous",
  ];
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
  return locationSchema.find({}).then((data) => {
    return data;
  });
};

const addLocation = async (body, list) => {
  if (
    body.location_name === undefined ||
    body.created_by === undefined ||
    body.description === undefined ||
    body.public === undefined
  ) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  const listOfNames = list.map((location) => {
    return location.location_name;
  });

  if (listOfNames.includes(body.location_name)) {
    return Promise.reject({
      status: 409,
      message: "Location name already exists",
    });
  }

  const location = await locationSchema.insertMany({
    ...body,
    _id: locationSchema.length,
  });
  return location;
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

module.exports = {
  fetchLocations,
  addLocation,
  fetchLocationById,
  updateLocationById,
};
