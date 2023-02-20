const express = require("express");
const router = express.Router();

router.get("/locations", (req, res) => {
  res.send("Get locations");
});
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
