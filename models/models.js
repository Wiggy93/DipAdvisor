const locationSchema = require("../schemas/locationSchema");

const addLocation = async (body) => {
  if (
    body.location_name === undefined ||
    body.created_by === undefined ||
    body.description === undefined ||
    body.public === undefined
  ) {
    console.log("created at not here");
    return Promise.reject({ status: 400, message: "Bad Request" });
  } else {
    const location = await locationSchema.insertMany(body);
    return location;
  }
};

module.exports = { addLocation };
