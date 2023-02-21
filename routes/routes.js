const express = require("express");
const { getLocations, getLocationById } = require("../controllers/controllers");
const router = express.Router();

router.get("/locations", getLocations);
router.get("/locations/:location_id", getLocationById);

router.post("/locations", (req, res) => {
  res.send("Post location");
});

router.patch("/locations/:location_id", (req, res) => {
  res.send("Patch location");
});

module.exports = router;
