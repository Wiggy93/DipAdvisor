const locationsRouter = require("express").Router();
const {
  patchLocationById,
  getLocationById,
  getLocations,
  postLocation,
} = require("../controllers/controllers");

locationsRouter.route("/").get(getLocations).post(postLocation);

locationsRouter
  .route("/:location_id")
  .get(getLocationById)
  .patch(patchLocationById);

module.exports = locationsRouter;
