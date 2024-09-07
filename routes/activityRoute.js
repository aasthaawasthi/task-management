const express = require("express");
const { getActivities } = require("../controllers/activityController");
const router = express.Router();

router.get("/all-activities", getActivities);

module.exports = router;
