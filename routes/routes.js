const router = require("express").Router();
const { getEndpoints } = require("../controllers/controllers");
const locationsRouter = require("./locations-routes");

router.route("/").get(getEndpoints);
router.use("/locations", locationsRouter);

module.exports = router;
