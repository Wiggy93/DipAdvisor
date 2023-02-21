const express = require("express");
const {
  getLocations,
  getLocationById,
  patchLocationById,
} = require("../controllers/controllers");
const router = express.Router();

router.get("/locations", getLocations);
router
  .route("/locations/:location_id")
  .get(getLocationById)
  .patch(patchLocationById);

router.post("/locations", (req, res) => {
  res.send("Post location");
});

router.patch("/locations/:location_id", (req, res) => {
  res.send("Patch location");
});

module.exports = router;
