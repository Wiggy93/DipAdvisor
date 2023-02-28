const express = require("express");
const {
  getLocations,
  getLocationById,
  patchLocationById,
  postLocation,
  patchPhotoByLocation,
} = require("../controllers/controllers");
const router = express.Router();

router.get("/locations", getLocations);
router
  .route("/locations/:location_id")
  .get(getLocationById)
  .patch(patchLocationById);

router.post("/locations", postLocation);

router.route("/photos/:location_id").patch(patchPhotoByLocation);

// What is this for? It doesn't seem to do anything.
// router.patch("/locations/:location_id", (req, res) => {
//   res.send("Patch location");
// });

module.exports = router;
