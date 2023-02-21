const locationSchema = require("../schemas/locationSchema");

const fetchLocations = () => {
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

  const location = await locationSchema.insertMany(body);
  return location;
};

module.exports = { fetchLocations, addLocation };
