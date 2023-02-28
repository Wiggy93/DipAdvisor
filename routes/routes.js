const express = require("express");
const { patchPhotoByLocation } = require("../controllers/controllers");
const router = express.Router();
const { getEndpoints } = require("../controllers/controllers");
const locationsRouter = require("./locations-routes");

router.route("/").get(getEndpoints);
router.use("/locations", locationsRouter);

router.route("/photos/:location_id").patch(patchPhotoByLocation);

module.exports = router;
