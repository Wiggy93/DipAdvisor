const express = require("express");
const getLocations = require("../controllers/controllers");
const router = express.Router();

router.get("/locations", getLocations);
router.get("/locations/:location_id", (req, res) => {
  res.send("Get location");
});

router.post("/locations", (req, res) => {
  res.send("Post location");
});

router.patch("/locations/:location_id", (req, res) => {
  res.send("Patch location");
});

module.exports = router;
